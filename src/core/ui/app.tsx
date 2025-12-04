import { AppLayout } from "./components/app-layout";
import { MainProvider } from "./providers/main-provider";

export function App() {
  return (
    <MainProvider>
      <AppLayout />
    </MainProvider>
  )
}
