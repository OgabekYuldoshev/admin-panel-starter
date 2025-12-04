import type { RouteObject } from "react-router";
import type { ResourceConfig } from "../../config";

export function createResource<Config extends ResourceConfig>(
	resourceKey: string,
	resource: Config,
) {
	const route: RouteObject = {
		path: resourceKey,
		children: [
			{
				index: true,
				async lazy() {
					const { ResourceIndexPage } = await import("./index");
					return {
						element: <ResourceIndexPage {...{ resourceKey }} />,
					};
				},
			},
			{
				path: "create",
				async lazy() {
					const { ResourceCreatePage } = await import("./create");
					return {
						element: <ResourceCreatePage {...{ resourceKey }} />,
					};
				},
			},
			{
				path: "update/:id",
				async lazy() {
					const { ResourceUpdatePage } = await import("./update");
					return {
						element: <ResourceUpdatePage {...{ resourceKey }} />,
					};
				},
			},
		],
	};
	const api = {
		label: resource.label,
		api: resource.api,
		hasSidebar: resource.hasSidebar ?? true,
		route,
	};
	return api;
}

export type Resource = ReturnType<typeof createResource>;
