import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import type React from "react";

export interface ThemeProviderProps {
	children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MantineProvider>
			{children}
		</MantineProvider>
	);
}
