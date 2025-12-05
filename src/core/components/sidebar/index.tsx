import { Stack, Text, UnstyledButton } from "@mantine/core";
import { NavLink as RouterNavLink, useLocation } from "react-router";
import { useAppState } from "../../state";
import styles from "./sidebar.module.scss";

export function Sidebar() {
	const { features, config } = useAppState();
	const location = useLocation();

	const featureEntries = Array.from(features.entries());

	return (
		<Stack gap={4} p="md">
			<Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs" px="xs">
				Features
			</Text>
			{featureEntries.map(([featureKey, feature]) => {
				// Agar feature'da route bo'lmasa, ko'rsatmaymiz
				if (!("route" in feature) || !feature.route) {
					return null;
				}

				const path = `/${featureKey}`;
				const isActive = location.pathname.startsWith(path);
				const featureConfig = config.features[featureKey];
				const label = featureConfig?.label || featureKey.charAt(0).toUpperCase() + featureKey.slice(1);

				return (
					<RouterNavLink
						key={featureKey}
						to={path}
						className={({ isActive: routerIsActive }) =>
							`${styles.navLink} ${routerIsActive || isActive ? styles.active : ""}`
						}
					>
						<UnstyledButton className={styles.navButton} w="100%">
							<Text size="sm" fw={isActive ? 600 : 500}>
								{label}
							</Text>
						</UnstyledButton>
					</RouterNavLink>
				);
			})}
		</Stack>
	);
}

