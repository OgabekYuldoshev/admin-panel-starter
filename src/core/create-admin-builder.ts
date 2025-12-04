import { createServiceRegistry } from "./service";
import type { AdminConfig } from "./types/config";
import { App } from "./ui/app";

export function createAdminBuilder<Config extends AdminConfig = AdminConfig>(
  options: Config
) {
  const servicesRegistry = createServiceRegistry(options.env.services);
  return {
    App,
    servicesRegistry,
  };
}
