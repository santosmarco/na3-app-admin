import type { ConditionalExcept } from "type-fest";

import type { Na3User, Na3UserRegistrationId } from "../modules/na3-types";
import { createRandomUserStyle, timestamp } from "../utils";

type UserBuildConfigRequired = Pick<
  Na3User,
  | "email"
  | "firstName"
  | "lastName"
  | "middleName"
  | "positionIds"
  | "registrationId"
>;

type UserBuildConfigOptional = Partial<
  ConditionalExcept<Na3User, keyof UserBuildConfigRequired>
>;

type UserBuildConfig = UserBuildConfigOptional & UserBuildConfigRequired;

type UserBuildOptions = {
  skipRegistrationIdFormat?: boolean;
};

export function formatRegistrationId(
  unformatted: string
): Na3UserRegistrationId {
  return parseInt(unformatted)
    .toString()
    .padStart(4, "0") as Na3UserRegistrationId;
}

export function getAuthEmail(registrationId: string): string {
  return `${formatRegistrationId(registrationId)}@novaa3-app.com.br`;
}

export function buildUser(
  userConfig: UserBuildConfig,
  options?: UserBuildOptions
): Omit<Na3User, "uid"> {
  const now = timestamp();

  const user: Omit<Na3User, "uid"> = {
    activityHistory: [],
    createdAt: now,
    displayName: `${userConfig.firstName} ${userConfig.lastName}`,
    isActive: true,
    isEmailVerified: false,
    isSuper: false,
    notificationTokens: [],
    photoUrl: null,
    style: createRandomUserStyle(),
    updatedAt: now,
    isPasswordDefault: true,
    lastSeenAt: now,
    bio: null,
    ...userConfig,
    registrationId: options?.skipRegistrationIdFormat
      ? userConfig.registrationId
      : formatRegistrationId(userConfig.registrationId),
  };

  return user;
}
