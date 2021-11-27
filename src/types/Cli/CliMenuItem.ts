import type { Promisable } from "type-fest";

import type { CliSpinner } from "./CliSpinner";

export type MenuItemHandlerResultStr = `${string}.`;

export type MenuItemHandlerResultError = {
  error: MenuItemHandlerResultStr;
};

export type MenuItemHandler = (
  spinnerController: CliSpinner
) => Promisable<MenuItemHandlerResultError | MenuItemHandlerResultStr>;

export type MenuItemOnStartMessage = `${string}...`;

export type MenuItem = {
  label: string;
  onSelect: MenuItemHandler;
  onStartMessage: MenuItemOnStartMessage;
};
