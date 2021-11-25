import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

void (async (): Promise<void> => {
  const { docs: templates } = await admin
    .firestore()
    .collection("transf-label-templates")
    .get();

  await Promise.all(
    templates.map((template) =>
      admin
        .firestore()
        .collection("TEST-transf-label-templates")
        .doc(template.id)
        .set({ ...template.data() })
    )
  );
})();
