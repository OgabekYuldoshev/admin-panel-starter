import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import classes from "./style.module.scss";

export function ProfileDropdown() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            withinPortal
            opened={opened}
            onClose={() => toggle()}
            onOpen={() => toggle()}
        >
            <Menu.Target>
                <UnstyledButton className={classes.profile} px="md" py={8}>
                    <Group>
                        <Avatar src="https://avatar.iran.liara.run/public/30" radius="xl" size={24} />
                        <Text fw={500} size="sm" lh={1} mr={3}>John Doe</Text>
                        <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={16} stroke={1.5} />}>
                    Profile
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={16} stroke={1.5} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
