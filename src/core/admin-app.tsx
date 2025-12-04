import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { AppStateContext, createAppState } from "./state";
import type { AppConfig, DefaultServices } from "./config";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export function AdminApp<TServices extends DefaultServices>({
	appConfig,
}: {
	appConfig: AppConfig<TServices>;
}) {
	const [state] = useState(() => createAppState(appConfig));

	return (
		<AppStateContext.Provider value={state}>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={state.router} />
				</QueryClientProvider>
			</ThemeProvider>
		</AppStateContext.Provider>
	);
}
