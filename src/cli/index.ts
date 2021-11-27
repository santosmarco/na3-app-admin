import type { Terminal } from "terminal-kit";
import { terminal } from "terminal-kit";

import type { MenuItem } from "../types";
import { handleCliError, processExit } from "../utils";
import { menuItems } from "./menuItems";
import { startSpinner } from "./spinner";
import { prepareTerminal } from "./terminal";

const menuItemsWithExit = [...menuItems.map((item) => item.label), "Exit"];

function displayMenu(): void {
  terminal.gridMenu(menuItemsWithExit, handleMenuItemSelect);
}

function handleCliInitialize(): void {
  prepareTerminal();
  displayMenu();
}

function handleMenuItemSelect(
  err: unknown,
  { selectedIndex }: Terminal.GridMenuResponse
): void {
  if (err) {
    handleCliError(err);
  }

  if (selectedIndex === menuItemsWithExit.length - 1) {
    processExit();
  }

  const selectedItem = menuItems[selectedIndex];

  void runMenuItem(selectedItem);
}

async function runMenuItem(item: MenuItem): Promise<void> {
  const { onSelect, onStartMessage } = item;

  const spinner = startSpinner(onStartMessage);

  try {
    const result = await onSelect(spinner);

    if (typeof result === "string") {
      spinner.succeed(result);
    } else {
      spinner.fail(result.error);
    }

    displayMenu();
  } catch (err) {
    handleCliError(err, spinner);
  }
}

export const cli = {
  initialize: handleCliInitialize,
};
