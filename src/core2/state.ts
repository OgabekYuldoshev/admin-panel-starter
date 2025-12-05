import { createContext, useContext } from "react";
import type { AdminConfig } from "./config";

export function createAppState(config: AdminConfig) {
  return {
    config,
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return state;
}
