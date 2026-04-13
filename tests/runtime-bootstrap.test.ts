import { describe, expect, it } from "vitest";
import { YellowJacketRuntime } from "@yellowjacket/core";
import { createAuthorForgePermissionEnvelope, createAuthorForgeSceneContinuityRequest } from "@yellowjacket/app-bindings";
import { getWorkcellDefinition } from "@yellowjacket/workcells";

describe("runtime bootstrap", () => {
  it("creates a planned run summary", () => {
    const runtime = new YellowJacketRuntime();
    const envelope = createAuthorForgePermissionEnvelope();
    const request = createAuthorForgeSceneContinuityRequest(
      {
        requestedBy: "charlie",
        sceneDocumentRefs: ["scene://chapter-07/scene-001"]
      },
      envelope
    );

    const summary = runtime.bootstrapRun(
      request,
      getWorkcellDefinition("scene-continuity-review"),
      envelope
    );

    expect(summary.currentState).toBe("planned");
    expect(summary.trace.dependency_events[0]).toContain("cortex");
  });
});
