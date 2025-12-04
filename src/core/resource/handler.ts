import type { ResourceConfig } from "../config";
import type { AxiosInstance } from "axios";
import { getListResponseSchema } from "./utils";

export function createHandler(
  resourceConfig: ResourceConfig,
  service: AxiosInstance
) {
  const actions = resourceConfig.api.actions;
  return {
    async list() {
      const { data } = await service.get(actions.list.url);
      const transformedData = actions.list.requestTransform?.(data) ?? data;
      const responseSchema = getListResponseSchema(actions.list.response);
      const parsedData = await responseSchema.parseAsync(transformedData);
      return parsedData;
    },
    async get(id: string) {
      const { data } = await service.get(`${actions.get.url}/${id}`);
      return data;
    },
    async create(payload: any) {
      const { data } = await service.post(actions.create.url, payload);
      return data;
    },
    async update(id: string, payload: any) {
      const { data } = await service.put(
        `${actions.update.url}/${id}`,
        payload
      );
      return data;
    },
    async delete(id: string) {
      const { data } = await service.delete(`${actions.delete.url}/${id}`);
      return data;
    },
  };
}
