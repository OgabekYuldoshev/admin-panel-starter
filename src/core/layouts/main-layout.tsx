import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { AppLogo } from "../components/app-logo";
import { ProfileDropdown } from "../components/profile-dropdown";
import { Sidebar } from "../components/sidebar";

export function MainLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group gap="md" h="100%">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <AppLogo title="Admin Panel" />
                    </Group>
                    <ProfileDropdown
                        user={{
                            name: "John Doe",
                            email: "john.doe@example.com",
                        }}
                        onProfileClick={() => console.log("Profile clicked")}
                        onSettingsClick={() => console.log("Settings clicked")}
                        onLogoutClick={() => console.log("Logout clicked")}
                    />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
