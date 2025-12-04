import { Group, Image, Title } from '@mantine/core';

export interface AppLogoProps {
    title?: string,
    image?: string,
}

export function AppLogo({
    title = "Admin Panel",
    image = "/vite.svg" }: AppLogoProps) {
    return (
        <Group>
            <Image
                src={image}
                alt={title}
                w={32}
                h={32}
                radius="md"
                fit="contain"
            />
            <Title order={4}>{title}</Title>
        </Group>
    )
}
