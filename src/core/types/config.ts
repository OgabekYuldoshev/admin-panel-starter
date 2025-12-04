import type { ServicesConfig } from "../service";

export type AdminConfig<ServiceMap extends ServicesConfig = ServicesConfig> = {
  env: {
    services: ServiceMap;
  };
};
