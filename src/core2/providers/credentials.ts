import type { CredentialsConfig } from "../oauth";

export function Credentials(
  config: Omit<CredentialsConfig, "type" | "serviceName">
): CredentialsConfig {
  return {
    type: "credentials",
    serviceName: "main",
    ...config,
  };
}
