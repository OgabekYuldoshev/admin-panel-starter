import { useCallback, useMemo } from "react";
import { useAppState } from "../state";
import { Flex, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";

export function AppSidebar() {
	const { pathname } = useLocation();
	const { resources } = useAppState();

	const sidebarItems = useMemo(() => {
		return [...resources.values()]
			.filter((resource) => resource.hasSidebar)
			.map((resource) => {
				return {
					label: resource.label,
					path: resource.route.path,
				};
			});
	}, [resources]);

	const checkPathnameIsActive = useCallback(
		(path: string) => {
			return pathname.includes(path);
		},
		[pathname],
	);

	console.log(sidebarItems);

	return (
		<Flex direction="column">
			{sidebarItems.map((item) => {
				const path = item.path || "/";
				return (
					<NavLink
						active={checkPathnameIsActive(path)}
						key={item.path}
						label={item.label}
						component={Link}
						to={path}
					/>
				);
			})}
		</Flex>
	);
}
