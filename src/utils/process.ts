import { terminal } from "terminal-kit";

export function processExit(code = 0): never {
  return terminal.processExit(code) as never;
}
