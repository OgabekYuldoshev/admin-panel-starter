import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconLogout, IconUser } from '@tabler/icons-react'

export function ProfileDropdown() {
    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton>
                    <Group>
                        <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn" />
                        <Text>John Doe</Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={16} stroke={1.5} />}>
                    Profile
                </Menu.Item>
                <Menu.Item color="red" leftSection={<IconLogout size={16} stroke={1.5} />}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
