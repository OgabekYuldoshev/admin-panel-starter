import { ThemeProvider } from "./components/theme-provider";
import { MainLayout } from "./layouts/main-layout";

export function AdminBuilder() {
    return (
        <ThemeProvider>
            <MainLayout />
        </ThemeProvider>
    )
}
