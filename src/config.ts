import z from "zod";
import { defineConfig } from "./core";

export const builderConfig = defineConfig({
  services: {
    main: {
      baseURL: "https://dummyjson.com",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
  features: {
    posts: {
      label: "Posts",
      type: "crud",
      service: "main",
      endpoints: {
        list: {
          url: "/posts",
          method: "GET",
          responseValidation: z.object({
            posts: z.array(
              z.object({
                id: z.number(),
                title: z.string(),
                body: z.string(),
                userId: z.number(),
                tags: z.array(z.string()),
              })
            ),
            total: z.number(),
            limit: z.number(),
          }),
        },
        single: {
          url: "/posts/:id",
          method: "GET",
          responseValidation: z.object({
            id: z.number(),
            title: z.string(),
            body: z.string(),
            userId: z.number(),
            tags: z.array(z.string()),
            reactions: z.number(),
          }),
        },
        create: {
          url: "/posts/add",
          method: "POST",
          responseValidation: z.object({
            id: z.number(),
            title: z.string(),
            body: z.string(),
            userId: z.number(),
            tags: z.array(z.string()),
            reactions: z.number(),
          }),
        },
        update: {
          url: "/posts/:id",
          method: "PUT",
          responseValidation: z.object({
            id: z.number(),
            title: z.string(),
            body: z.string(),
            userId: z.number(),
            tags: z.array(z.string()),
            reactions: z.number(),
          }),
        },
        delete: {
          url: "/posts/:id",
          method: "DELETE",
          responseValidation: z.object({
            id: z.number(),
            title: z.string(),
            body: z.string(),
            userId: z.number(),
            tags: z.array(z.string()),
            reactions: z.number(),
            isDeleted: z.boolean(),
            deletedOn: z.string(),
          }),
        },
      },
      form: {
        fields: {
          title: {
            type: "string",
            label: "Title",
            placeholder: "Enter post title",
            validation: z.string().min(1),
          },
          body: {
            type: "string",
            label: "Body",
            placeholder: "Enter post body",
            validation: z.string().min(1),
          },
          userId: {
            type: "number",
            label: "User ID",
            placeholder: "Enter user ID",
            validation: z.number().min(1),
          },
        },
      },
    },
    comments: {
      label: "Comments",
      type: "crud",
      service: "main",
      endpoints: {
        list: {
          url: "/comments",
          method: "GET",
          responseValidation: z.object({
            comments: z.array(
              z.object({
                id: z.number(),
                body: z.string(),
                postId: z.number(),
              })
            ),
            total: z.number(),
            limit: z.number(),
          }),
        },
        single: {
          url: "/comments/:id",
          method: "GET",
          responseValidation: z.object({
            comment: z.object({
              id: z.number(),
              body: z.string(),
              postId: z.number(),
            }),
          }),
        },
        create: {
          url: "/comments",
          method: "POST",
          responseValidation: z.object({
            comment: z.object({
              id: z.number(),
              body: z.string(),
              postId: z.number(),
            }),
          }),
        },
        update: {
          url: "/comments/:id",
          method: "PUT",
          responseValidation: z.object({
            comment: z.object({
              id: z.number(),
              body: z.string(),
              postId: z.number(),
            }),
          }),
        },
        delete: {
          url: "/comments/:id",
          method: "DELETE",
          responseValidation: z.object({
            comment: z.object({
              id: z.number(),
              body: z.string(),
              postId: z.number(),
            }),
          }),
        },
      },
      form: {
        fields: {
          body: {
            type: "string",
            label: "Body",
            placeholder: "Enter the body of the comment",
            validation: z.string().min(1),
          },
          userId: {
            type: "number",
            label: "User ID",
            placeholder: "Enter the user ID",
            validation: z.number().min(1),
          },
          postId: {
            type: "number",
            label: "Post ID",
            placeholder: "Enter the post ID",
            validation: z.number().min(1),
          },
        },
      },
    },
  },
});
