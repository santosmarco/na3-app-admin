import PrettyError from "pretty-error";

import type { CliSpinner } from "../types";
import { processExit } from "./process";
import { hasProps } from "./typeGuards";

const pe = new PrettyError();

function renderErrorAndExit(error: unknown): never {
  pe.render(error as Error);
  processExit();
}

export function handleCliError(error: unknown, spinner?: CliSpinner): never {
  if (!spinner) {
    renderErrorAndExit(error);
  }

  if (typeof error === "string") {
    spinner.fail(error);
  } else if (hasProps(error, "message") && typeof error.message === "string") {
    spinner.fail(error.message);
  } else {
    spinner.fail("Something went wrong.");
  }

  renderErrorAndExit(error);
}
