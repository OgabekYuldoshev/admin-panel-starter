import { createContext, useContext } from "react";
import type { AdminConfig } from "./define-config";
import { createFeature, type Feature } from "./libs/feature";
import type { Route } from "./libs/route";
import { createRouter } from "./libs/router";
import { createService } from "./libs/service";

export function createAppState(config: AdminConfig) {
  const services = createService(config.services);
  const features = new Map<string, Feature>();

  for (const [name, feature] of Object.entries(config.features)) {
    features.set(
      name,
      createFeature({
        featureKey: name,
        featureConfig: feature,
        service: services.getService(feature.service),
      })
    );
  }

  const routes = [...features.values()]
    .filter((feature) => "route" in feature)
    .map((feature) => feature.route) as Route[];

  const router = createRouter(routes);

  return {
    services,
    features,
    router,
    config,
    getFeature: (featureKey: string) => {
      const feature = features.get(featureKey);
      if (!feature) {
        throw new Error(`Feature ${featureKey} not found`);
      }
      return feature;
    },
    getService: (serviceKey: string) => {
      const service = services.getService(serviceKey);
      if (!service) {
        throw new Error(`Service ${serviceKey} not found`);
      }
      return service;
    },
  };
}

type AppState = ReturnType<typeof createAppState>;

export const AppStateContext = createContext<AppState>(
  {} as unknown as AppState
);

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return state;
}
