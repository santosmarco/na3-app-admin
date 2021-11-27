import { terminal } from "terminal-kit";

export function prepareTerminal(): void {
  terminal.clear();
  terminal.hideCursor();
}
