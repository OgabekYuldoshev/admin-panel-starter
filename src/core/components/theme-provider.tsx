import type { ReactNode } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	return <MantineProvider>{children}</MantineProvider>;
}
