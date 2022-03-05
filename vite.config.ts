import { resolve } from "node:path";
import { defineConfig } from "vite";

const pathResolve = (...args: string[]) => resolve(__dirname, ...args);

export default defineConfig({
  build: {
    lib: {
      entry: pathResolve("src/main"),
      name: "MyOwnEveryLayoutComponents",
      fileName: (format) => `every-layout-components.${format}.js`,
    },
  },
});
