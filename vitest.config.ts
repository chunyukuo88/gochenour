import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "src/common/displayMethods.js",
        "**/*.spec.js",
        "**/*/__test__",
      ],
    },
  },
});
