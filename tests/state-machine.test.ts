import { describe, expect, it } from "vitest";
import { assertAllowedTransition, isAllowedTransition } from "@yellowjacket/core";

describe("YellowJacket state machine", () => {
  it("allows requested -> admitted", () => {
    expect(isAllowedTransition("requested", "admitted")).toBe(true);
  });

  it("rejects approved -> in_progress", () => {
    expect(isAllowedTransition("approved", "in_progress")).toBe(false);
  });

  it("throws on invalid transition", () => {
    expect(() => assertAllowedTransition("approved", "in_progress")).toThrow();
  });
});
