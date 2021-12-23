import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { loremIpsum } from "lorem-ipsum";
import type { Falsy } from "utility-types";

import { DEPARTMENTS } from "../../db/departments";
import type { Na3Department, Na3Position } from "../../modules/na3-types";
import type { DayjsInput } from "../../types";
import { handleFilterDuplicates, handleFilterFalsies } from "../arrays";
import { isArray } from "../typeGuards";

export function randomInt(
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  const interval = Math.abs(maxInt - minInt);

  return Math.floor(Math.random() * interval + minInt);
}

export function randomPick<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return;
  }

  const randomIdx = randomInt(0, arr.length);

  return arr[randomIdx];
}

type RandomPickManyOptions = {
  allowDuplicates?: boolean;
};

export function randomPickMany<T>(
  arr: T[],
  maxCount?: number,
  options?: RandomPickManyOptions
): Exclude<T, Falsy>[];
export function randomPickMany<T>(
  fn: () => T,
  maxCount: number,
  options?: RandomPickManyOptions
): Exclude<T, Falsy>[];
export function randomPickMany<T>(
  arrOrFn: T[] | (() => T),
  maxCount?: number,
  options?: RandomPickManyOptions
): Exclude<T, Falsy>[] {
  const randomPicked = new Array(
    maxCount || (isArray(arrOrFn) ? arrOrFn.length : 0)
  )
    .fill(0)
    .map(() => {
      if (isArray(arrOrFn)) {
        return randomPick(arrOrFn);
      }
      return arrOrFn();
    })
    .filter(handleFilterFalsies);

  if (options?.allowDuplicates) {
    return randomPicked;
  }
  return randomPicked.filter(handleFilterDuplicates);
}

export function randomText(options?: {
  length?: number | "long" | "medium" | "short";
  prefix?: string;
  separator?: string;
  transform?: (generatedText: string) => string;
  uppercase?: boolean;
}): string {
  const length = options?.length ?? "medium";

  const numOfWords: number =
    length === "short"
      ? 4
      : length === "medium"
      ? 8
      : length === "long"
      ? 16
      : length;

  let generatedText: string = loremIpsum({
    count: numOfWords,
    format: "plain",
    suffix: "",
    units: "words",
  });

  if (options?.prefix) {
    generatedText = `${options.prefix}${generatedText}`;
  }
  if (options?.uppercase) {
    generatedText = generatedText.toUpperCase();
  }
  if (options?.separator) {
    generatedText = generatedText.split(" ").join(options.separator);
  }
  if (options?.transform) {
    generatedText = options.transform(generatedText);
  }

  return generatedText;
}

export function randomDayjs(start?: DayjsInput, end?: DayjsInput): Dayjs {
  const durationMs = dayjs(end).diff(dayjs(start), "ms");
  const randomMs = randomInt(0, durationMs);

  return dayjs(start).add(randomMs, "ms");
}

const DEFAULT_DPTS_INPUT: Na3Department[] = [
  ...Object.values(DEPARTMENTS["shop-floor"]),
  ...Object.values(DEPARTMENTS["factory-adm"]),
  ...Object.values(DEPARTMENTS.office),
];

export function randomNa3Position(
  dptsInput: Na3Department[] = DEFAULT_DPTS_INPUT
): Na3Position | undefined {
  const randomDpt = randomPick(dptsInput);

  if (!randomDpt) {
    return;
  }

  const randomPos = randomPick(randomDpt.positions);

  if (!randomPos) {
    return;
  }

  return randomPos;
}
