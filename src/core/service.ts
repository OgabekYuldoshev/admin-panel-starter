import axios, { type AxiosInstance } from "axios";

export type ServiceConfigEntry = {
  baseUrl: string;
  headers: Record<string, string>;
};

export type ServicesConfig = {
  [serviceName: string]: ServiceConfigEntry;
};

export interface ServiceRegistry<
  ServiceMap extends ServicesConfig = ServicesConfig,
  ServiceName extends keyof ServiceMap = keyof ServiceMap
> {
  // tuple rest: TS majburiy 1 ta argument talab qiladi (0 ta yoki 2+ ta xato bo'ladi)
  getService: (...args: [ServiceName]) => AxiosInstance;
}

export function createServiceRegistry<ServiceMap extends ServicesConfig>(
  services: ServiceMap
): ServiceRegistry<ServiceMap> {
  const servicesMap = new Map<string, AxiosInstance>();

  for (const [serviceName, serviceConfig] of Object.entries(services)) {
    servicesMap.set(
      serviceName,
      axios.create({
        baseURL: serviceConfig.baseUrl,
        headers: serviceConfig.headers,
      })
    );
  }

  return {
    getService(...[serviceName]) {
      const service = servicesMap.get(serviceName as string);
      if (!service) {
        throw new Error(`Service ${String(serviceName)} not found`);
      }
      return service;
    },
  };
}


