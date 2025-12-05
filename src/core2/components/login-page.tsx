import {
	Alert,
	Anchor,
	Button,
	Container,
	Divider,
	Group,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import {
	IconAlertCircle,
	IconLock,
	IconMail,
} from "@tabler/icons-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Email manzili noto'g'ri"),
	password: z.string().min(6, "Parol kamida 6 ta belgi bo'lishi kerak"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export type SocialProvider = {
	name: string;
	icon: React.ComponentType<{ size?: number }>;
	onClick: () => void | Promise<void>;
};

interface LoginPageProps {
	onLogin?: (data: LoginFormData) => Promise<void> | void;
	socialProviders?: SocialProvider[];
}

export function LoginPage({ onLogin, socialProviders = [] }: LoginPageProps) {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof LoginFormData, string>>
	>({});
	const [isLoading, setIsLoading] = useState(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	const handleChange =
		(field: keyof LoginFormData) => (event: ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [field]: event.target.value }));
			if (errors[field]) {
				setErrors((prev) => ({ ...prev, [field]: undefined }));
			}
			if (generalError) {
				setGeneralError(null);
			}
		};

	const validateForm = (): boolean => {
		try {
			loginSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
				error.issues.forEach((issue) => {
					if (issue.path[0]) {
						newErrors[issue.path[0] as keyof LoginFormData] = issue.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setGeneralError(null);

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			if (onLogin) {
				await onLogin(formData);
			}
		} catch (error) {
			setGeneralError(
				error instanceof Error ? error.message : "Kirishda xatolik yuz berdi",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialLogin = async (provider: SocialProvider) => {
		setIsLoading(true);
		setGeneralError(null);
		try {
			await provider.onClick();
		} catch (error) {
			setGeneralError(
				error instanceof Error
					? error.message
					: `${provider.name} orqali kirishda xatolik yuz berdi`,
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
				backgroundColor: "#f8f9fa",
			}}
		>
			<Container size={420} style={{ width: "100%" }}>
				<Paper
					withBorder
					shadow="sm"
					p={40}
					radius="md"
					style={{
						width: "100%",
						maxWidth: 420,
					}}
				>
					<Stack gap="lg">
						<div style={{ textAlign: "center" }}>
							<Title order={2} fw={600} mb={4}>
								Tizimga kirish
							</Title>
							<Text c="dimmed" size="sm">
								Hisobingizga kiring
							</Text>
						</div>

						{generalError && (
							<Alert
								icon={<IconAlertCircle size={16} />}
								title="Xatolik"
								color="red"
								variant="light"
							>
								{generalError}
							</Alert>
						)}

						<form onSubmit={handleSubmit}>
							<Stack gap="md">
								<TextInput
									label="Email"
									placeholder="sizning@email.com"
									required
									leftSection={<IconMail size={16} />}
									value={formData.email}
									onChange={handleChange("email")}
									error={errors.email}
									disabled={isLoading}
									radius="md"
								/>

								<PasswordInput
									label="Parol"
									placeholder="Parolingizni kiriting"
									required
									leftSection={<IconLock size={16} />}
									value={formData.password}
									onChange={handleChange("password")}
									error={errors.password}
									disabled={isLoading}
									radius="md"
								/>

								<Button
									type="submit"
									fullWidth
									mt="md"
									radius="md"
									loading={isLoading}
									size="md"
								>
									Kirish
								</Button>
							</Stack>
						</form>

						{socialProviders.length > 0 && (
							<>
								<Divider label="yoki" labelPosition="center" my="md" />

								<Stack gap="xs">
									{socialProviders.map((provider) => {
										const Icon = provider.icon;
										return (
											<Button
												key={provider.name}
												variant="default"
												fullWidth
												leftSection={<Icon size={18} />}
												radius="md"
												onClick={() => handleSocialLogin(provider)}
												loading={isLoading}
												size="md"
											>
												{provider.name} orqali kirish
											</Button>
										);
									})}
								</Stack>
							</>
						)}
					</Stack>
				</Paper>
			</Container>
		</div>
	);
}
