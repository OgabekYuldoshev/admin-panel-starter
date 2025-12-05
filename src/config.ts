import { defineConfig } from "./core";

export const builderConfig = defineConfig({
  env: {
    services: {
      main: {
        baseUrl: "https://api.example.com",
      },
    },
  },
});