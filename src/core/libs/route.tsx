import type { RouteObject } from "react-router";
import type { FeatureConfig } from "../define-config";
export function createRoute(featureKey: string, _featureConfig: FeatureConfig) {
    const route: RouteObject = {
        path: featureKey,
        children: [
            {
                index: true,
                async lazy() {
                    const { ListTemplate } = await import('../template/index');
                    return {
                        element: <ListTemplate featureKey={featureKey} />
                    }
                }
            },
            {
                path: 'create',
                async lazy() {
                    const { CreateTemplate } = await import('../template/create');
                    return {
                        element: <CreateTemplate featureKey={featureKey} />
                    }
                }
            },
            {
                path: 'update/:id',
                async lazy() {
                    const { UpdateTemplate } = await import('../template/update');
                    return {
                        element: <UpdateTemplate featureKey={featureKey} />
                    }
                }
            }
        ]
    };

    return route;
}

export type Route = ReturnType<typeof createRoute>;
