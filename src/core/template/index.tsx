import { useAppState } from "../state";

interface ListTemplateProps {
    featureKey: string;
}
export function ListTemplate({ featureKey }: ListTemplateProps) {
    const { getFeature } = useAppState()
    const feature = getFeature(featureKey)
    const { data, isLoading, isError, error } = feature.hooks.useList({
        retry: false,
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>

    return (
        <div>
            <h1>List</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
