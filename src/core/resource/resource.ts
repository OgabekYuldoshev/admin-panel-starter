/** biome-ignore-all lint/style/noNonNullAssertion: off */
import type { AxiosInstance } from "axios";
import type { ResourceConfig } from "../config";
import { createQueryOptions } from "./query";
import { createRoute } from "./route";

interface CreateResourceProps {
  resourceKey: string;
  resourceConfig: ResourceConfig;
  services: Map<string, AxiosInstance>;
}

export function createResource({
  resourceKey,
  resourceConfig,
  services,
}: CreateResourceProps) {
  const service = services.get(resourceConfig.api.service)!;

  const queryOptions = createQueryOptions({
    resourceKey,
    resourceConfig,
    service,
  });

  const api = {
    label: resourceConfig.label,
    api: resourceConfig.api,
    hasSidebar: resourceConfig.hasSidebar ?? true,
    route: createRoute(resourceKey),
    queryOptions,
  };
  return api;
}

export type Resource = ReturnType<typeof createResource>;
