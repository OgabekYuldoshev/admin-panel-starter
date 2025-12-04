import { useEffect, useMemo } from "react";
import { useAppState } from "../../state";

interface ResourceIndexPageProps {
	resourceKey: string;
}
export function ResourceIndexPage({ resourceKey }: ResourceIndexPageProps) {
	const { resources, services } = useAppState();
	const resource = useMemo(
		() => resources.get(resourceKey),
		[resources, resourceKey],
	);
	const service = useMemo(
		() => services.get(resource?.api.service as string),
		[services, resource],
	);

	useEffect(() => {
		service?.get("/comments").then((response) => {
			console.log(response.data);
		});
	}, [service]);

	return <div>ResourceIndex {resourceKey}</div>;
}
