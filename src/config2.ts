import { defineConfig } from "./core2/config";

export const adminConfig = defineConfig({
  service: {
    main: {
      baseURL: "https://api.example.com",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
  oauth: {
    serviceName: "main",
    strategy: "jwt",
    credentials: {
      login: {
        url: "/",
      },
      redirectUrl: "/",
    },
  },
});
