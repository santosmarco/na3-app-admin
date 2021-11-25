import "./db/positions";
import "./db/machine-issues";

import admin from "firebase-admin";
import ora from "ora";
import type { Terminal } from "terminal-kit";
import { terminal } from "terminal-kit";

import { DEPARTMENTS } from "./db/departments";
import { displayError } from "./utils";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const menuItems = ["Reset departments", "Close"] as const;

async function runGridSelection(
  selection: Terminal.GridMenuResponse
): Promise<void> {
  const spinner = ora();

  try {
    if (selection.selectedIndex === 0) {
      spinner.start("Resetting departments...");

      const dpts = [
        ...Object.values(DEPARTMENTS["shop-floor"]),
        ...Object.values(DEPARTMENTS["factory-adm"]),
        ...Object.values(DEPARTMENTS.office),
      ];

      await Promise.all(
        dpts.map(async (dpt) => {
          await admin
            .firestore()
            .collection("departments")
            .doc(dpt.id)
            .set(dpt);
        })
      );

      spinner.succeed(`${dpts.length} departments set successfully.`);
    }
  } catch (e) {
    spinner.fail("Error!");

    return displayError(e);
  }
}

terminal.gridMenu(menuItems, (err, res) => {
  if (err) {
    displayError(err);
    return;
  }

  void runGridSelection(res);
});
