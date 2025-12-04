import axios, { type AxiosInstance } from "axios";
import { createContext, useContext } from "react";
import type { AppConfig, DefaultServices, ResourceConfig } from "./config";
import { createResource, type Resource } from "./resource/resource";
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
      createResource({
        resourceKey,
        resourceConfig: resourceConfig as ResourceConfig,
        services,
      })
    );
  }

  const routes = [...resources.values()].map((resource) => resource.route);

  return {
    services,
    resources,
    router: createRouter(routes),
    getResource: (resourceKey: string) => {
      const resource = resources.get(resourceKey);
      if (!resource) {
        throw new Error(`Resource ${resourceKey} not found`);
      }
      return resource;
    },
    getService: (serviceKey: string) => {
      const service = services.get(serviceKey);
      if (!service) {
        throw new Error(`Service ${serviceKey} not found`);
      }
      return service;
    },
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
