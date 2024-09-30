import { FeatureToggles } from '../../types';
import { validateFeatureToggle } from '../validateFeatureToggle/validateFeatureToggle';

type CreateFeatureTogglesParams<TEnvs extends readonly string[]> = {
  featureToggles: FeatureToggles<TEnvs>;
  envs: TEnvs;
  env: TEnvs[number];
};

export const createFeatureToggles = <TEnvs extends readonly string[]>({
  featureToggles,
  envs,
  env
}: CreateFeatureTogglesParams<TEnvs>) => {
  Object.values(featureToggles).forEach((featureToggle) => {
    validateFeatureToggle(featureToggle, envs);
  });

  const getFeatureToggle = (key: string) => {
    return {
      meta: featureToggles[key].meta,
      enabled: featureToggles[key].enabled[env],
      value: featureToggles[key].value?.[env]
    };
  };

  return { getFeatureToggle };
};
