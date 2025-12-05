import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layouts/main-layout";
import type { Route } from "./route";

export function createRouter(routes: Route[]) {
  return createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      children: routes,
    },
  ]);
}

export type Router = ReturnType<typeof createRouter>;