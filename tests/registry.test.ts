import { describe, expect, it } from "vitest";
import { getWorkcellDefinition, listWorkcells } from "@yellowjacket/workcells";

describe("workcell registry", () => {
  it("contains the scene continuity review workcell", () => {
    const ids = listWorkcells().map((item) => item.workcell_id);
    expect(ids).toContain("scene-continuity-review");
  });

  it("returns a concrete workcell definition", () => {
    const definition = getWorkcellDefinition("scene-continuity-review");
    expect(definition.baseline_comparator_id).toBe("single-pass-scene-review");
    expect(definition.checkpoint_eligibility).toBe(true);
  });
});
