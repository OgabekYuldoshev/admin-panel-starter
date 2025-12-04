import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "./core";
import { defineConfig } from "./core/config";
import { z } from "zod";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element with id 'root' was not found in the DOM");
}

const appConfig = defineConfig({
	services: {
		main: {
			baseURL: "https://api.example.com",
			headers: {
				"Content-Type": "application/json",
			},
		},
		dummy: {
			baseURL: "https://dummyjson.com",
			headers: {
				"Content-Type": "application/json",
			},
		},
	},
	resources: {
		comments: {
			label: "Comments",
			api: {
				service: "dummy",
				actions: {
					create: {
						url: "/comments",
						payload: z.object({
							body: z.string().meta({
								type: "string",
							}),
							postId: z.number().meta({
								type: "integer",
							}),
							userId: z.number().meta({
								type: "integer",
							}),
						}),
						response: z.object({
							id: z.number(),
							body: z.string(),
						}),
					},
					update: {
						url: "/comments/:id",
						payload: z.object({
							body: z.string().meta({
								type: "string",
							}),
						}),
						response: z.object({
							id: z.number(),
							body: z.string(),
						}),
					},
					delete: {
						url: "/comments/:id",
					},
					list: {
						url: "/comments",
						requestTransform: (payload) => {
							return {
								items: payload?.comments ?? [],
								total: payload?.total ?? 0,
								limit: payload?.limit ?? 0,
							};
						},
						response: z.array(
							z.object({
								id: z.number(),
								body: z.string(),
								likes: z.number(),
							}),
						),
					},
					get: {
						url: "/comments/:id",
						response: z.object({
							id: z.number(),
							body: z.string(),
							likes: z.number(),
						}),
					},
				},
			},
		},
		posts: {
			label: "Posts",
			api: {
				service: "dummy",
				actions: {
					list: {
						url: "/posts",
						requestTransform: (payload) => {
							return {
								items: payload?.posts ?? [],
								total: payload?.total ?? 0,
								limit: payload?.limit ?? 0,
							};
						},
						response: z.array(
							z.object({
								id: z.number(),
								title: z.string(),
								body: z.string(),
								tags: z.array(z.string()),
							}),
						),
					},
					get: {
						url: "/posts/:id",
						response: z.object({
							id: z.number(),
							title: z.string(),
							body: z.string(),
							tags: z.array(z.string()),
						}),
					},
					create: {
						url: "/posts",
						payload: z.object({
							title: z.string().meta({
								type: "string",
							}),
						}),
						response: z.object({
							id: z.number(),
							title: z.string(),
							body: z.string(),
							tags: z.array(z.string()),
						}),
					},
					update: {
						url: "/posts/:id",
						payload: z.object({
							title: z.string().meta({
								type: "string",
							}),
						}),
						response: z.object({
							id: z.number(),
							title: z.string(),
							body: z.string(),
							tags: z.array(z.string()),
						}),
					},
					delete: {
						url: "/posts/:id",
					},
				},
			},
		},
	},
});

createRoot(rootElement).render(
	<StrictMode>
		<AdminApp appConfig={appConfig} />
	</StrictMode>,
);
