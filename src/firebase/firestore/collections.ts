import admin from "firebase-admin";

import type { MaybeArray } from "../../types";

export type FirestoreCollectionIdProd =
  | "departments"
  | "manut-projects"
  | "tickets"
  | "transf-label-templates"
  | "users";

export type FirestoreCollectionIdTest = `TEST-${FirestoreCollectionIdProd}`;

export type FirestoreCollectionId =
  | FirestoreCollectionIdProd
  | FirestoreCollectionIdTest;

export function getFirestoreCollectionRefs(
  collectionIds: FirestoreCollectionId[]
): FirebaseFirestore.CollectionReference[];
export function getFirestoreCollectionRefs(
  collectionId: FirestoreCollectionId
): FirebaseFirestore.CollectionReference;
export function getFirestoreCollectionRefs(
  collectionIdOrIds: MaybeArray<FirestoreCollectionId>
): MaybeArray<FirebaseFirestore.CollectionReference> {
  function getOneFirestoreCollection(
    collectionId: FirestoreCollectionId
  ): FirebaseFirestore.CollectionReference {
    return admin.firestore().collection(collectionId);
  }

  if (typeof collectionIdOrIds === "string") {
    return getOneFirestoreCollection(collectionIdOrIds);
  }
  return collectionIdOrIds.map(getOneFirestoreCollection);
}
