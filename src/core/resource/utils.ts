import { z, type ZodSchema } from "zod";

export const getListResponseSchema = <T>(schema: ZodSchema<T>) => {
  return z.object({
    items: schema,
    total: z.number(),
    limit: z.number(),
  });
};

export type ListResponse<T> = z.infer<
  ReturnType<typeof getListResponseSchema<T>>
>;
