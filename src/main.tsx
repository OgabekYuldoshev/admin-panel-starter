import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminDashboard } from "./core2";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element with id 'root' was not found in the DOM");
}

createRoot(rootElement).render(
	<StrictMode>
		<AdminDashboard />
	</StrictMode>,
);
