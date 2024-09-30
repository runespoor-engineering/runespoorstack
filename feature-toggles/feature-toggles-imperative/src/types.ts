export type FeatureToggleMeta = {
  description: string;
  createdAt: string;
  createdBy: string;
};

export type FeatureToggle<TEnvs extends readonly string[]> = {
  enabled: Record<TEnvs[number], boolean>;
  value?: Record<TEnvs[number], string | number | boolean | object | null>;
  meta: FeatureToggleMeta;
};

export type FeatureToggles<TEnvs extends readonly string[]> = Record<string, FeatureToggle<TEnvs>>;
