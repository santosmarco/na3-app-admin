import { randomInt, randomPick, randomText } from "./random";

describe("utils:random", () => {
  describe("randomInt", () => {
    test("should return an integer", () => {
      const result = randomInt();
      expect(Number.isInteger(result)).toBe(true);
    });

    test("should return 0 when range is 0,0", () => {
      const result = randomInt(0, 0);
      expect(result).toBe(0);
    });

    test("should return 0 when range is 0,1", () => {
      const result = randomInt(0, 1);
      expect(result).toBe(0);
    });

    test("should return 0 when range is 0,0.3", () => {
      const result = randomInt(0, 0.3);
      expect(result).toBe(0);
    });

    test("should return 1 when range is 0.1,1", () => {
      const result = randomInt(0.1, 1);
      expect(result).toBe(1);
    });

    test("should return 1 when range is 0.1,1.3", () => {
      const result = randomInt(0.1, 1.3);
      expect(result).toBe(1);
    });
  });

  describe("randomPick", () => {
    test('should return either "foo", "bar", or "baz"', () => {
      const testArr = ["foo", "bar", "baz"];
      const result = randomPick(testArr);

      expect(testArr).toContain(result);
    });

    test('should return "foo"', () => {
      const testArr = ["foo"];
      const result = randomPick(testArr);

      expect(result).toBe("foo");
    });

    test("should return undefined", () => {
      const testArr: never[] = [];
      const result = randomPick(testArr);

      expect(result).toBeUndefined();
    });
  });

  describe("randomText", () => {
    test("should return a text containing 8 words", () => {
      const result = randomText();
      const words = result.split(" ");

      expect(words).toHaveLength(8);
    });

    test("should return a text containing 4 words", () => {
      const result = randomText({ length: "short" });
      const words = result.split(" ");

      expect(words).toHaveLength(4);
    });

    test("should return a text containing 16 words", () => {
      const result = randomText({ length: "long" });
      const words = result.split(" ");

      expect(words).toHaveLength(16);
    });

    test("should return a text containing 24 words", () => {
      const result = randomText({ length: 24 });
      const words = result.split(" ");

      expect(words).toHaveLength(24);
    });
  });
});

export {};
