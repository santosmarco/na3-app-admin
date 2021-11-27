import admin from "firebase-admin";

export function initializeFirebase(): void {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}
