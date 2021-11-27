import type { firestore } from "firebase-admin";
import admin from "firebase-admin";

class FirestoreBatch {
  /**
   * @description A collection of `WriteBatch` documents.
   *
   * Because Firebase disallows sending more than 500 writes per request, each batch can only store up to 400 writes.
   *
   * Once the latest batch is full, it will be committed and a new one will be added to the array.
   * @private
   * @type {firestore.WriteBatch[]}
   * @memberof FirestoreBatch
   */
  private readonly batches: firestore.WriteBatch[] = [
    admin.firestore().batch(),
  ];

  /**
   * @description A collection of `Promises` that resolves to an array of `WriteResult` documents.
   *
   * Each time a batch stored in `FirestoreBatch.batches` reaches its 400th document, it gets committed. The resulting `Promise` is then stored in this array.
   *
   * When `FirebaseBatch.commit()` gets called, it will commit any pending batch and wait for all `Promises` in this array to resolve.
   *
   * @private
   * @type {Promise<firestore.WriteResult[]>[]}
   * @memberof FirestoreBatch
   */
  private readonly commits: Promise<firestore.WriteResult[]>[] = [];

  /**
   * @description A counter of writes that has been added to the current batch.
   *
   * When it reaches 400, the following procedures happen, in order:
   *
   * 1. The current batch gets committed;
   * 2. This commit's resulting `Promise` is added to the `FirestoreBatch.commits` array; and
   * 3. A new batch is created and pushed to `FirestoreBatch.batches`.
   *
   * @private
   * @memberof FirestoreBatch
   */
  private currBatchSize = 0;

  /**
   * @description Retrieve the batch that is currently being used to store writes. It will always be the last batch in `FirestoreBatch.batches`.
   *
   * Additionally, before returning it, if the current batch is full, the method handles its commit, resets `currBatchSize`, and adds a new, empty batch to the `batches` array, returning this one instead.
   *
   * @private
   * @returns {WriteBatch} The batch currently handling writes.
   * @memberof FirestoreBatch
   */
  private getCurrentBatch(): firestore.WriteBatch {
    const getLastBatch = (): firestore.WriteBatch =>
      this.batches[this.batches.length - 1];

    if (this.currBatchSize > 400) {
      this.commits.push(getLastBatch().commit());

      this.batches.push(admin.firestore().batch());
      this.currBatchSize = 0;
    }

    return getLastBatch();
  }

  /**
   * @description Create the document referred to by the provided `DocumentReference`. The
   * operation will fail the batch if a document exists at the specified
   * location.
   *
   * @template T
   * @param {firestore.DocumentReference<T>} documentRef A reference to the document to be created.
   * @param {T} data The object data to serialize as the document.
   * @returns {FirestoreBatch} This `FirestoreBatch` instance. Used for chaining method calls.
   * @memberof FirestoreBatch
   */
  create<T>(
    documentRef: firestore.DocumentReference<T>,
    data: T
  ): FirestoreBatch {
    this.currBatchSize++;
    this.getCurrentBatch().create(documentRef, data);
    return this;
  }

  /**
   * @description Write to the document referred to by the provided `DocumentReference`.
   * If the document does not exist yet, it will be created.
   *
   * @template T
   * @param {firestore.DocumentReference<T>} documentRef A reference to the document to be set.
   * @param {Partial<T>} data An object of the fields and values for the document.
   * @returns {FirestoreBatch} This `FirestoreBatch` instance. Used for chaining method calls.
   * @memberof FirestoreBatch
   */
  set<T>(
    documentRef: firestore.DocumentReference<T>,
    data: Partial<T>
  ): FirestoreBatch {
    this.currBatchSize++;
    this.getCurrentBatch().set(documentRef, data);
    return this;
  }

  /**
   * @description Update fields of the document referred to by the provided
   * `DocumentReference`. If the document doesn't yet exist, the update fails
   * and the entire batch will be rejected.
   *
   * Nested fields can be updated by providing dot-separated field path
   * strings.
   *
   * @template T
   * @param {firestore.DocumentReference<T>} documentRef A reference to the document to be updated.
   * @param {Partial<T>} data An object containing the fields and values with which to update the document.
   * @returns {FirestoreBatch} This `FirestoreBatch` instance. Used for chaining method calls.
   * @memberof FirestoreBatch
   */
  update<T>(
    documentRef: firestore.DocumentReference<T>,
    data: Partial<T>
  ): FirestoreBatch {
    this.currBatchSize++;
    this.getCurrentBatch().update(documentRef, data);
    return this;
  }

  /**
   * @description Delete the document referred to by the provided `DocumentReference`.
   *
   * @template T
   * @param {firestore.DocumentReference<T>} documentRef A reference to the document to be deleted.
   * @returns {FirestoreBatch} This `FirestoreBatch` instance. Used for chaining method calls.
   * @memberof FirestoreBatch
   */
  delete<T>(documentRef: firestore.DocumentReference<T>): FirestoreBatch {
    this.currBatchSize++;
    this.getCurrentBatch().delete(documentRef);
    return this;
  }

  /**
   * @description Commit the last, pending batch and resolve to an array of `WriteResult` when all 400-document batches have been committed.
   *
   * @returns {Promise<firestore.WriteResult[]>} A Promise resolved once all of the writes in the batch have been successfully written to the backend as an atomic unit.
   * @memberof FirestoreBatch
   */
  async commit(): Promise<firestore.WriteResult[]> {
    const writeResults = (
      await Promise.all([...this.commits, this.getCurrentBatch().commit()])
    ).flat();
    return writeResults;
  }
}

export function createFirestoreBatch(): FirestoreBatch {
  return new FirestoreBatch();
}
