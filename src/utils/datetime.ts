import dayjs from "dayjs";

import type { DayjsInput } from "../types";

export function timestamp(fromDayjs?: DayjsInput): string {
  return dayjs(fromDayjs).format();
}
