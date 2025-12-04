export function createRoute(resourceKey: string) {
	return {
		path: resourceKey,
		children: [
			{
				index: true,
				async lazy() {
					const { ResourceIndexPage } = await import("./ui/index");
					return {
						element: <ResourceIndexPage {...{ resourceKey }} />,
					};
				},
			},
			{
				path: "create",
				async lazy() {
					const { ResourceCreatePage } = await import("./ui/create");
					return {
						element: <ResourceCreatePage {...{ resourceKey }} />,
					};
				},
			},
			{
				path: "update/:id",
				async lazy() {
					const { ResourceUpdatePage } = await import("./ui/update");
					return {
						element: <ResourceUpdatePage {...{ resourceKey }} />,
					};
				},
			},
		],
	};
}
