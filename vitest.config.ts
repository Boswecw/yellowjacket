import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@yellowjacket/contracts": path.resolve(__dirname, "packages/yellowjacket-contracts/src/index.ts"),
      "@yellowjacket/core": path.resolve(__dirname, "packages/yellowjacket-core/src/index.ts"),
      "@yellowjacket/workcells": path.resolve(__dirname, "packages/yellowjacket-workcells/src/index.ts"),
      "@yellowjacket/verification": path.resolve(__dirname, "packages/yellowjacket-verification/src/index.ts"),
      "@yellowjacket/domain-packs": path.resolve(__dirname, "packages/yellowjacket-domain-packs/src/index.ts"),
      "@yellowjacket/app-bindings": path.resolve(__dirname, "packages/yellowjacket-app-bindings/src/index.ts")
    }
  }
});
