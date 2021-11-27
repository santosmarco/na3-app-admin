import type { MaybeArray } from "../types";

export function isArray<T>(test: unknown): test is Array<T> {
  return Array.isArray(test);
}

export function hasProps<T extends PropertyKey>(
  test: unknown,
  props: MaybeArray<T>
): test is Record<T, unknown> {
  const propsArr = isArray(props) ? props : [props];

  return (
    typeof test === "object" &&
    test !== null &&
    propsArr.every((prop) => prop in test)
  );
}
