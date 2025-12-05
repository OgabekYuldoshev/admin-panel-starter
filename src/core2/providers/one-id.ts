import type { OAuthConfig, SSOConfig } from "../oauth";

export function OneId(config: Omit<SSOConfig, "type">): OAuthConfig {
  return {
    type: "sso",
    ...config,
  };
}
