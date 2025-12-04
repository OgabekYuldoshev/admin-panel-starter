import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { AppStateContext, createAppState } from "./state";
import type { AppConfig, DefaultServices } from "./config";
import { RouterProvider } from "react-router";

export function AdminApp<TServices extends DefaultServices>({
	appConfig,
}: {
	appConfig: AppConfig<TServices>;
}) {
	const [state] = useState(() => createAppState(appConfig));

	return (
		<AppStateContext.Provider value={state}>
			<ThemeProvider>
				<RouterProvider router={state.router} />
			</ThemeProvider>
		</AppStateContext.Provider>
	);
}
