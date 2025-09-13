import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json-summary"], // 👈 enable lcov for badges
      reportsDirectory: "./coverage",
      all: true,
      include: ["src/**/*.ts"],
      exclude: ["**/*.d.ts", "node_modules"],
    },
  },
});
