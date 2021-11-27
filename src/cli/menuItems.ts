import { DEPARTMENTS } from "../db/departments";
import type {
  FirestoreCollectionIdProd,
  FirestoreCollectionIdTest,
} from "../firebase";
import { createFirestoreBatch, getFirestoreCollectionRefs } from "../firebase";
import { buildUser } from "../helpers";
import type { Na3UserRegistrationId } from "../modules/na3-types";
import type { MenuItem, MenuItemHandler } from "../types";

const onSetDepartments: MenuItemHandler = async () => {
  const departments = [
    ...Object.values(DEPARTMENTS["shop-floor"]),
    ...Object.values(DEPARTMENTS["factory-adm"]),
    ...Object.values(DEPARTMENTS.office),
  ];

  await Promise.all(
    departments.map((dpt) =>
      getFirestoreCollectionRefs("departments").doc(dpt.id).set(dpt)
    )
  );

  return `Set ${departments.length} departments.`;
};

const onCloneProduction: MenuItemHandler = async () => {
  const prodCollectionIds: FirestoreCollectionIdProd[] = [
    "departments",
    "manut-projects",
    "tickets",
    "transf-label-templates",
    "users",
  ];
  const testCollectionIds: FirestoreCollectionIdTest[] = prodCollectionIds.map(
    (id): FirestoreCollectionIdTest => `TEST-${id}`
  );

  const prodCollections = getFirestoreCollectionRefs(prodCollectionIds);
  const testCollections = getFirestoreCollectionRefs(testCollectionIds);

  const prodSnapshots = await Promise.all(
    prodCollections.map((collection) => collection.get())
  );
  const testSnapshots = await Promise.all(
    testCollections.map((collection) => collection.get())
  );

  const batch = createFirestoreBatch();

  testSnapshots.forEach((snapshot) =>
    snapshot.forEach((doc) => batch.delete(doc.ref))
  );

  prodSnapshots.forEach((snapshot, idx) =>
    snapshot.forEach((doc) => {
      const testDocRef = testCollections[idx].doc(doc.id);
      batch.set(testDocRef, { ...doc.data() });
    })
  );

  const writes = await batch.commit();

  return `Cloned ${writes.length} documents.`;
};

const onSetMarco: MenuItemHandler = async () => {
  const registrationId: Na3UserRegistrationId = "0000";

  const marco = buildUser({
    email: "msantos@novaa3.com.br",
    middleName: "C",
    firstName: "Marco Aurelio",
    lastName: "dos Santos",
    isSuper: true,
    positionIds: ["desenvolvimento.desenvolvedor"],
    registrationId,
    isPasswordDefault: false,
  });

  const uid = process.env.MARCO_UID;

  if (!uid) {
    return { error: "ENV variable for Marco's UID not found." };
  }

  await Promise.all(
    getFirestoreCollectionRefs(["users", "TEST-users"]).map((collection) =>
      collection.doc(uid).set(marco)
    )
  );

  return "Set Marco as Super.";
};

export const menuItems: MenuItem[] = [
  {
    label: "Set departments",
    onSelect: onSetDepartments,
    onStartMessage: "Setting departments...",
  },
  {
    label: "Clone prod",
    onSelect: onCloneProduction,
    onStartMessage: "Cloning prod into test collections...",
  },
  {
    label: "Set Super (Marco)",
    onSelect: onSetMarco,
    onStartMessage: "Setting Marco...",
  },
];
