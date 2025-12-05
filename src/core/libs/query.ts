import {
  type MutationOptions,
  type QueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { Handler } from "./handler";

type CustomQueryOptions = Omit<QueryOptions, "queryKey" | "queryFn">;
type CustomMutationOptions = Omit<
  MutationOptions,
  "mutationKey" | "mutationFn"
>;

export function createQuery({
  featureKey,
  handlers,
}: {
  featureKey: string;
  handlers: Handler;
}) {
  return {
    useList: (queryOptions: CustomQueryOptions = {}) => {
      return useQuery({
        queryKey: [featureKey, "list"],
        queryFn: () => handlers.list(),
        ...queryOptions,
      });
    },
    useSingle: (id: string, queryOptions: CustomQueryOptions = {}) => {
      return useQuery({
        queryKey: [featureKey, "single", id],
        queryFn: () => handlers.single(id),
        ...queryOptions,
      });
    },
    useCreate: (payload: any, mutationOptions: CustomMutationOptions = {}) => {
      return useMutation({
        mutationKey: [featureKey, "create"],
        mutationFn: () => handlers.create(payload),
        ...mutationOptions,
      });
    },
    useUpdate: (
      id: string,
      payload: any,
      mutationOptions: CustomMutationOptions = {}
    ) => {
      return useMutation({
        mutationKey: [featureKey, "update", id],
        mutationFn: () => handlers.update(id, payload),
        ...mutationOptions,
      });
    },
    useDelete: (id: string, mutationOptions: CustomMutationOptions = {}) => {
      return useMutation({
        mutationKey: [featureKey, "delete", id],
        mutationFn: () => handlers.delete(id),
        ...mutationOptions,
      });
    },
  };
}
