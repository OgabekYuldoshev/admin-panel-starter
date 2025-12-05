import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { RouterProvider } from "react-router";
// import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import type { AdminConfig } from "./define-config";
import { AppStateContext, createAppState } from "./state";
import { queryClient } from "./utils/query-client";

interface AdminBuilderProps {
	config: AdminConfig;
}

export function AdminBuilder({ config }: AdminBuilderProps) {
	const [appState] = useState(() => createAppState(config));

	return (
		<AppStateContext.Provider value={appState}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<RouterProvider router={appState.router} />
				</ThemeProvider>
			</QueryClientProvider>
		</AppStateContext.Provider>
	);
}
