export type AdminConfig = {
  service: {
    [key: string]: {
      baseURL: string;
      headers?: Record<string, string>;
    };
  };
  oauth: {
    serviceName: string;
    strategy: "jwt" | "cookie";
    credentials: {
      login: {
        url: string;
      };
      logout?: {
        url: string;
      };
      redirectUrl?: string;
    };
  };
};

export function defineConfig(config: AdminConfig) {
  return Object.freeze(config);
}
