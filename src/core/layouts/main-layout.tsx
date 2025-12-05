import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppLogo } from "../components/app-logo";
import { ProfileDropdown } from "../components/profile-dropdown";

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
            <AppShell.Navbar p="md">
                Navbar is collapsed on mobile at sm breakpoint. At that point it is no longer offset by
                padding in the main element and it takes the full width of the screen when opened.
            </AppShell.Navbar>
            <AppShell.Main>
                <Text>This is the main section, your app content here.</Text>
                <Text>Layout used in most cases – Navbar and Header with fixed position</Text>
            </AppShell.Main>
        </AppShell>
    )
}
