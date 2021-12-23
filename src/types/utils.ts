import type dayjs from "dayjs";

export type MaybeArray<T> = T | T[];

export type DayjsInput = Parameters<typeof dayjs>[0];
