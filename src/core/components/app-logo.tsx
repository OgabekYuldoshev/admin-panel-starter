import { Group, Text } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface AppLogoProps {
	title: string;
	icon?: ReactNode;
	size?: "sm" | "md" | "lg";
}

export function AppLogo({ title, icon, size = "md" }: AppLogoProps) {
	const sizeMap = {
		sm: { iconSize: 20, fontSize: "sm" as const },
		md: { iconSize: 24, fontSize: "md" as const },
		lg: { iconSize: 32, fontSize: "lg" as const },
	};

	const { iconSize, fontSize } = sizeMap[size];

	return (
		<Group gap="xs" align="center" wrap="nowrap">
			{icon || (
				<IconBrandGoogle
					size={iconSize}
					style={{ flexShrink: 0 }}
				/>
			)}
			<Text
				size={fontSize}
				fw={600}
				style={{ lineHeight: 1 }}
			>
				{title}
			</Text>
		</Group>
	);
}

