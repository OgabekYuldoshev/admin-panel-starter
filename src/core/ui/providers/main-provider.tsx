import { ThemeProvider } from "./theme-provider";

export interface MainProviderProps {
    children: React.ReactNode;
}
export function MainProvider({ children }: MainProviderProps) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
