import type { AdminConfig } from "./config";

type ExtractEnv<Config extends AdminConfig> = Config["env"];

export type ConfigGeneric<
  Config extends AdminConfig = AdminConfig,
  Env extends ExtractEnv<Config> = ExtractEnv<Config>
> = {
  Env: Env;
};
