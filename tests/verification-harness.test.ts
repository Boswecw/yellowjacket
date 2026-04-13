import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { validateArtifact } from "@yellowjacket/verification";

describe("verification harness", () => {
  it("validates the sample review packet fixture", () => {
    const filePath = path.resolve(process.cwd(), "fixtures/scene-continuity-review/expected/review-packet.example.json");
    const payload = JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown;
    const result = validateArtifact("review-packet.schema.json", payload);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
