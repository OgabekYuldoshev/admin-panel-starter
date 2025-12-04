import { createBrowserRouter, type RouteObject } from "react-router";
import { AppLayout } from "./components/app-layout";
import { WelcomePage } from "./components/welcome-page";

export function createRouter(routes: RouteObject[]) {
	return createBrowserRouter([
		{
			path: "/",
			Component: AppLayout,
			children: [
				{
					index: true,
					Component: WelcomePage,
				},
				...routes,
			],
		},
	]);
}
