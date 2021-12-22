import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const registrationIds = ["0687", "0849", "0653"];
const uids = [
  "jbmgHS48yaSqjeyovEDcXtWlzAv1",
  "unr3uYcaOxNgHfcGJVHfGIh2iN63",
  "29MWv9yqopTYorutvghnMe1lzZ23",
];

void (async (): Promise<void> => {
  const snapshot = await admin.firestore().collection("users").get();

  snapshot.forEach((user) => {
    const userData = user.data();
    const { registrationId: userRegistrationId } = userData;

    if (
      typeof userRegistrationId === "string" &&
      registrationIds.includes(userRegistrationId)
    ) {
      void admin
        .firestore()
        .collection("users")
        .doc(uids[registrationIds.indexOf(userRegistrationId)])
        .set(userData)
        .then(() =>
          console.log(uids[registrationIds.indexOf(userRegistrationId)])
        );
    }
  });
})();
