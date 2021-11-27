import ora from "ora";

import type { CliSpinner, MenuItemOnStartMessage } from "../types";

export function startSpinner(message: MenuItemOnStartMessage): CliSpinner {
  return ora().start(message);
}
