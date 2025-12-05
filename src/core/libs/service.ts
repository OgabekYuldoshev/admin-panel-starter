import axios, { type AxiosInstance } from "axios";
import type { AdminConfig } from "../define-config";

export type Service = AxiosInstance;

export function createService(services: AdminConfig["services"]) {
  const serviceMap = new Map<string, Service>();
  for (const [name, config] of Object.entries(services)) {
    serviceMap.set(name, axios.create(config));
  }

  return {
    getService(serviceName: string) {
      const service = serviceMap.get(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }
      return service;
    },
  };
}

