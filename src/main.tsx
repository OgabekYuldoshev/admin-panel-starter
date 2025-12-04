import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAdminBuilder } from "./core/create-admin-builder";

const rootElement = document.getElementById("root") as HTMLElement;

const { App, servicesRegistry } = createAdminBuilder({
  env: {
    services: {
      main: {
        baseUrl: "https://api.example.com",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  },
});

servicesRegistry.getService("main");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
