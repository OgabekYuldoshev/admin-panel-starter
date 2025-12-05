import type { ZodSchema } from "zod";

export type EndpointMethod = "GET" | "POST" | "PUT" | "DELETE";

type EndpointBaseConfig = {
	url: string;
	method: EndpointMethod;
	responseValidation: ZodSchema;
};

type EndpointResponseListConfig = EndpointBaseConfig & {
	transformResponse?: (data: any) => {
		total: number;
		limit: number;
		items: any[];
	};
};

type EndpointResponseItemConfig = EndpointBaseConfig & {
	transformResponse?: (data: any) => {
		item: any;
	};
};

type FeatureFormFieldType = "string" | "number";

type FeatureFormFieldConfig = {
	type: FeatureFormFieldType;
	label: string;
	placeholder?: string;
	validation?: ZodSchema;
	initialValue?: any;
};

type FeatureBaseConfig = {
	label: string;
	service: string;
}

export type FeatureCrudConfig = FeatureBaseConfig & {
  type: "crud";
  endpoints: {
    list: EndpointResponseListConfig;
	single: EndpointResponseItemConfig;
    create: EndpointResponseItemConfig;
    update: EndpointResponseItemConfig;
    delete: EndpointResponseItemConfig;
  };
  form: {
	fields?: {
		[key: string]: FeatureFormFieldConfig
	},
  }
};

export type FeatureCustomConfig = FeatureBaseConfig & {
  type: "custom";
};

export type FeatureConfig = FeatureCrudConfig | FeatureCustomConfig;

export type AdminConfig = {
	services: {
		[key: string]: {
			baseURL: string;
			headers?: Record<string, string>;
		};
	};
	features: {
		[key: string]: FeatureConfig;
	};
};

export function defineConfig(config: AdminConfig) {
	return Object.freeze(config);
}
