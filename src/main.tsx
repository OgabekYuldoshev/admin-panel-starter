import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "./core";
import { defineConfig } from "./core/config";

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
			},
		},
		posts: {
			label: "Posts",
			api: {
				service: "dummy",
			},
		},
		users: {
			label: "Users",
			api: {
				service: "dummy",
			},
		},
		products: {
			label: "Products",
			api: {
				service: "dummy",
			},
		},
	},
});

createRoot(rootElement).render(
	<StrictMode>
		<AdminApp appConfig={appConfig} />
	</StrictMode>,
);
