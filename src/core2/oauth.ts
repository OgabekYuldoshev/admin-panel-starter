export type CredentialsConfig = {
  type: "credentials";
  serviceName: string;
  redirectUri: string;
  extraParams?: Record<string, string>;
};

export type SSOConfig = {
  type: "sso";
  url: string;
  clientId: string;
  state: string;
  scope?: string[];
  redirectUri: string;
  extraParams?: Record<string, string>;
};

export type OAuthConfig = CredentialsConfig | SSOConfig;
