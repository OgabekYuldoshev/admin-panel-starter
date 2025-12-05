import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { ThemeProvider } from "../core/components/theme-provider";
import { LoginPage, type SocialProvider } from "./components";

export function AdminDashboard() {
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
		<ThemeProvider>
			<LoginPage
				onLogin={async (data) => {
					console.log("Login:", data);
					// Login logikasini bu yerda yozing
				}}
				socialProviders={socialProviders}
			/>
		</ThemeProvider>
	);
}
