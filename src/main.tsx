import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAdminBuilder } from "./core/create-admin-builder";

const rootElement = document.getElementById("root") as HTMLElement;

const { App } = createAdminBuilder({
	ui: {
		
	},
	resources:{
		translations: {
			label: "Translations",
		}
	}
})

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);