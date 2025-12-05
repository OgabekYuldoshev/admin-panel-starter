import type {
  FeatureConfig,
  FeatureCrudConfig,
  FeatureCustomConfig,
} from "../define-config";
import { createHandler } from "./handler";
import { createQuery } from "./query";
import { createRoute } from "./route";
import type { Service } from "./service";

interface CreateFeatureProps {
  featureKey: string;
  featureConfig: FeatureConfig;
  service: Service;
}

function createCrudFeature({
  featureKey,
  service,
  featureConfig,
}: {
  featureKey: string;
  service: Service;
  featureConfig: FeatureCrudConfig;
}) {
  const handlers = createHandler({ service, featureConfig });
  const hooks = createQuery({ featureKey, handlers });
  const route = createRoute(featureKey, featureConfig);
  
  return {
    handlers,
    hooks,
    route
  };
}

function createCustomFeature(_options: {
  service: Service;
  featureConfig: FeatureCustomConfig;
}) {
  return {};
}
export function createFeature({ featureKey, service, featureConfig }: CreateFeatureProps) {


  return createCrudFeature({ featureKey, service, featureConfig: featureConfig as FeatureCrudConfig });
}

export type Feature = ReturnType<typeof createFeature>;
