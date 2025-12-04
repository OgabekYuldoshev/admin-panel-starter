export type ServiceConfig = {
  baseURL: string;
  headers: Record<string, string>;
};

export type DefaultServices = Record<string, ServiceConfig>;

export type ResourceConfig<
  TServices extends DefaultServices = DefaultServices
> = {
  label: string;
  hasSidebar?: boolean;
  api: {
    service: keyof TServices & string;
  };
};

export interface AppConfig<TServices extends DefaultServices> {
  services: TServices;
  resources: Record<string, ResourceConfig<TServices>>;
}

export function defineConfig<TServices extends DefaultServices>(
  config: AppConfig<TServices>
) {
  return Object.freeze(config);
}
