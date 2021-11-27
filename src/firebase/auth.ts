import firebase from "firebase";

import { getAuthEmail } from "../helpers";
import type { Na3UserRegistrationId } from "../modules/na3-types";

export function getFirebaseAuth(): firebase.auth.Auth {
  return firebase.auth();
}

export function createAuthUser(
  registrationId: Na3UserRegistrationId,
  password: string
): Promise<firebase.auth.UserCredential> {
  return getFirebaseAuth().createUserWithEmailAndPassword(
    getAuthEmail(registrationId),
    password
  );
}
