import {
	Avatar,
	Box,
	Divider,
	Group,
	Menu,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	IconChevronDown,
	IconLogout,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import styles from "./profile-dropdown.module.scss";

interface ProfileDropdownProps {
	user?: {
		name?: string;
		email?: string;
		avatar?: string;
	};
	onProfileClick?: () => void;
	onSettingsClick?: () => void;
	onLogoutClick?: () => void;
}

export function ProfileDropdown({
	user,
	onProfileClick,
	onSettingsClick,
	onLogoutClick,
}: ProfileDropdownProps) {
	const userName = user?.name || "User";
	const userEmail = user?.email || "user@example.com";
	const userAvatar = user?.avatar;

	return (
		<Menu shadow="md" width={200} position="bottom-end" withArrow>
			<Menu.Target>
				<UnstyledButton className={styles.profileButton}>
					<Group gap="sm" wrap="nowrap">
						<Avatar src={userAvatar} alt={userName} size="md" radius="xl">
							{userName.charAt(0).toUpperCase()}
						</Avatar>
						<Group gap={4} wrap="nowrap" visibleFrom="sm">
							<div className={styles.userInfo}>
								<Text size="sm" fw={500} lineClamp={1}>
									{userName}
								</Text>
								<Text size="xs" c="dimmed" lineClamp={1}>
									{userEmail}
								</Text>
							</div>
							<IconChevronDown size={16} className={styles.chevron} />
						</Group>
						<Box hiddenFrom="sm">
							<IconChevronDown size={16} className={styles.chevronMobile} />
						</Box>
					</Group>
				</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>
					<Text size="sm" fw={500} lineClamp={1}>
						{userName}
					</Text>
					<Text size="xs" c="dimmed" lineClamp={1}>
						{userEmail}
					</Text>
				</Menu.Label>

				<Divider />

				<Menu.Item
					leftSection={<IconUser size={16} />}
					onClick={onProfileClick}
				>
					Profile
				</Menu.Item>

				<Menu.Item
					leftSection={<IconSettings size={16} />}
					onClick={onSettingsClick}
				>
					Settings
				</Menu.Item>

				<Divider />

				<Menu.Item
					leftSection={<IconLogout size={16} />}
					color="red"
					onClick={onLogoutClick}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
