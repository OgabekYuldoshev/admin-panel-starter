import type { AxiosInstance } from "axios";
import type { ResourceConfig } from "../config";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createHandler } from "./handler";

interface CreateQueryOptionsProps {
  resourceKey: string;
  resourceConfig: ResourceConfig;
  service: AxiosInstance;
}

export function createQueryOptions({
  resourceKey,
  resourceConfig,
  service,
}: CreateQueryOptionsProps) {
  const handler = createHandler(resourceConfig, service);
  return {
    list: () =>
      queryOptions({
        queryKey: ["resource", resourceKey, "list"],
        queryFn: handler.list,
      }),
    get: (id: string) =>
      queryOptions({
        queryKey: ["resource", resourceKey, "get", id],
        queryFn: () => handler.get(id),
      }),
    create: mutationOptions({
      mutationKey: ["resource", resourceKey, "create"],
      mutationFn: handler.create,
    }),
    update: mutationOptions({
      mutationKey: ["resource", resourceKey, "update"],
      mutationFn: handler.update,
    }),
    delete: mutationOptions({
      mutationKey: ["resource", "delete"],
      mutationFn: handler.delete,
    }),
  };
}
