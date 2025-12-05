import { compile } from "path-to-regexp";
import type { FeatureCrudConfig } from "../define-config";
import type { Service } from "./service";

interface CreateHandlerProps {
  service: Service;
  featureConfig: FeatureCrudConfig;
}
export function createHandler({ service, featureConfig }: CreateHandlerProps) {
  const endpoints = featureConfig.endpoints;
  const createUrlCompiler = (url: string) => compile(url);

  return {
    async list() {
      const { data } = await service({
        url: endpoints.list.url,
        method: endpoints.list.method,
      });
      const transformedData = endpoints.list.transformResponse
        ? endpoints.list.transformResponse(data)
        : data;

      const parsedData =
        endpoints.list.responseValidation.parseAsync(transformedData);

      return parsedData;
    },
    async single(id: string) {
      const compiler = createUrlCompiler(endpoints.single.url);
      const url = compiler({ id });
      const { data } = await service({
        url,
        method: endpoints.single.method,
      });
      const transformedData = endpoints.single.transformResponse
        ? endpoints.single.transformResponse(data)
        : data;

      const parsedData = await endpoints.single.responseValidation.parseAsync(
        transformedData
      );

      return parsedData;
    },
    async create(payload: any) {
      const { data } = await service({
        url: endpoints.create.url,
        method: endpoints.create.method,
        data: payload,
      });
      const transformedData = endpoints.create.transformResponse
        ? endpoints.create.transformResponse(data)
        : data;

      const parsedData =
        endpoints.create.responseValidation.parseAsync(transformedData);

      return parsedData;
    },
    async update(id: string, payload: any) {
      const compiler = createUrlCompiler(endpoints.update.url);
      const url = compiler({ id });
      const { data } = await service({
        url,
        method: endpoints.update.method,
        data: payload,
      });
      const transformedData = endpoints.update.transformResponse
        ? endpoints.update.transformResponse(data)
        : data;

      const parsedData =
        endpoints.update.responseValidation.parseAsync(transformedData);

      return parsedData;
    },
    async delete(id: string) {
      const compiler = createUrlCompiler(endpoints.delete.url);
      const url = compiler({ id });
      const { data } = await service({
        url,
        method: endpoints.delete.method,
      });
      const transformedData = endpoints.delete.transformResponse
        ? endpoints.delete.transformResponse(data)
        : data;

      const parsedData =
        endpoints.delete.responseValidation.parseAsync(transformedData);

      return parsedData;
    },
  };
}

export type Handler = ReturnType<typeof createHandler>;
