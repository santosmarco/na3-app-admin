import * as colors from "@ant-design/colors";

import type { Na3UserStyle, WebColor } from "../modules/na3-types";
import { randomPick } from "./random/random";

export function createRandomUserStyle(): Na3UserStyle {
  const colorKeys: WebColor[] = [
    "blue",
    "cyan",
    "geekblue",
    "gold",
    "green",
    "lime",
    "magenta",
    "orange",
    "purple",
    "red",
    "volcano",
    "yellow",
  ];

  let chosen = randomPick(colorKeys);

  if (!chosen) {
    chosen = "blue";
  }

  return {
    backgroundColor: colors[chosen][2],
    color: colors[chosen][8],
    webColor: chosen,
  };
}
