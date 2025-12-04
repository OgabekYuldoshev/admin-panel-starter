import axios, { type AxiosInstance } from "axios";
import { createContext, useContext } from "react";
import type { AppConfig, DefaultServices, ResourceConfig } from "./config";
import {
  createResource,
  type Resource,
} from "./components/resource/create-resource";
import { createRouter } from "./router";

export function createAppState<TServices extends DefaultServices>(
  config: AppConfig<TServices>
) {
  const services = new Map<string, AxiosInstance>();
  const resources = new Map<string, Resource>();

  for (const [serviceName, serviceConfig] of Object.entries(config.services)) {
    services.set(serviceName, axios.create(serviceConfig));
  }

  for (const [resourceKey, resourceConfig] of Object.entries(
    config.resources
  )) {
    resources.set(
      resourceKey,
      createResource(resourceKey, resourceConfig as ResourceConfig)
    );
  }

  const routes = [...resources.values()].map((resource) => resource.route);

  return {
    services,
    resources,
    router: createRouter(routes),
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within a AppStateContext");
  }
  return ctx;
}
