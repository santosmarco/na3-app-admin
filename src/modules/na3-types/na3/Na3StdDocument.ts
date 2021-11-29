import type { Na3UserPrivilegeId } from "./user/Na3UserPrivilege";

export type Na3StdDocumentType = "form";

export type Na3StdDocumentPrivileges = {
  approve: Na3UserPrivilegeId[];
  download: Na3UserPrivilegeId[];
  print: Na3UserPrivilegeId[];
  read: Na3UserPrivilegeId[];
};

export type Na3StdDocumentVersion = {
  approvedAt: string;
  approvedByUid: string;
  createdAt: string;
  id: string;
  number: number;
};

export type Na3StdDocument = {
  code: string;
  description: string;
  id: string;
  nextRevisionAt: string;
  privileges: Na3StdDocumentPrivileges;
  timeBetweenRevisionsMs: number;
  title: string;
  type: Na3StdDocumentType;
  versions: Na3StdDocumentVersion[];
};
