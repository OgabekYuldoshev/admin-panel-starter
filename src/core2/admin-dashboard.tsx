import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { ThemeProvider } from "../core/components/theme-provider";
import { LoginPage, type SocialProvider } from "./components";
import type { AdminConfig } from "./config";
import { useState } from "react";
import { AppStateContext, createAppState } from "./state";

interface AdminDashboardProps {
	config: AdminConfig;
}

export function AdminDashboard({ config }: AdminDashboardProps) {
	const [appState] = useState(() => createAppState(config));
	const socialProviders: SocialProvider[] = [
		{
			name: "Google",
			icon: IconBrandGoogle,
			onClick: async () => {
				// Google login logikasini bu yerda yozing
				console.log("Google login");
			},
		},
		{
			name: "GitHub",
			icon: IconBrandGithub,
			onClick: async () => {
				// GitHub login logikasini bu yerda yozing
				console.log("GitHub login");
			},
		},
	];

	return (
		<AppStateContext.Provider value={appState}>
			<ThemeProvider>
				<LoginPage
					onLogin={async (data) => {
						console.log("Login:", data);
					}}
					socialProviders={socialProviders}
				/>
			</ThemeProvider>
		</AppStateContext.Provider>
	);
}
