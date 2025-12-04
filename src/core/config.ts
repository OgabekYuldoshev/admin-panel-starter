import type { ZodSchema } from "zod";
import type { ListResponse } from "./resource/utils";

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
    actions: {
      create: {
        url: string;
        payload?: ZodSchema;
        response: ZodSchema;
      };
      update: {
        url: string;
        payload?: ZodSchema;
        response: ZodSchema;
      };
      delete: {
        url: string;
      };
      get: {
        url: string;
        response: ZodSchema;
      };
      list: {
        url: string;
        response: ZodSchema;
        requestTransform?: (payload: any) => ListResponse<any>;
      };
    };
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
