import { useMemo } from "react";
import { useAppState } from "../../state";
import {
	keepPreviousData,
	useQuery,
} from "@tanstack/react-query";

interface ResourceIndexPageProps {
	resourceKey: string;
}
export function ResourceIndexPage({ resourceKey }: ResourceIndexPageProps) {
	const { getResource } = useAppState();

	const resource = useMemo(
		() => getResource(resourceKey),
		[getResource, resourceKey],
	);

	const { data, isFetched, error } = useQuery({
		...resource.queryOptions.list(),
		initialData: {
			items: [],
			total: 0,
			limit: 0,
		},
		placeholderData: keepPreviousData,
	});

	if (!isFetched) {
		return <div>Loading...</div>;
	}

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
