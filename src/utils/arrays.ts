import type { Falsy } from "utility-types";

export function handleFilterDuplicates<T>(
  el: T,
  idx: number,
  arr: T[]
): boolean {
  return arr.indexOf(el) === idx;
}

export function handleFilterFalsies<T>(el: T): el is Exclude<T, Falsy> {
  return !!el;
}
