import { describe, expect, it } from "vitest";
import { groupConsecutiveBy } from "../../src/lib/grouping";

const groupableKey = (letter: string) =>
  letter === "a" || letter === "b" ? letter : undefined;

describe("groupConsecutiveBy", () => {
  it("groups consecutive items sharing a key and keeps the others alone", () => {
    expect(
      groupConsecutiveBy(["x", "a", "a", "y", "y", "b", "a"], groupableKey),
    ).toEqual([["x"], ["a", "a"], ["y"], ["y"], ["b"], ["a"]]);
  });

  it("returns no group for no item", () => {
    expect(groupConsecutiveBy([], groupableKey)).toEqual([]);
  });
});
