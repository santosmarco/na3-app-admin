import { terminal } from "terminal-kit";

export function processExit(code = 0): never {
  terminal.processExit(code);
  process.exit(code);
}
