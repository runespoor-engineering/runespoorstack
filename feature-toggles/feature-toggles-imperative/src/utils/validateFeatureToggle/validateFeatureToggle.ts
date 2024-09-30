import { FeatureToggle } from '../../types';

export const validateFeatureToggle = <TEnvs extends readonly string[]>(
  featureToggle: FeatureToggle<TEnvs>,
  envs: TEnvs
) => {
  if (!featureToggle.meta) {
    throw new Error('meta is required for each feature toggle');
  }
  if (!featureToggle.meta.createdAt) {
    throw new Error('meta.createdAt is required for each feature toggle');
  }
  if (!featureToggle.meta.createdBy) {
    throw new Error('meta.createdBy is required for each feature toggle');
  }
  if (!featureToggle.enabled) {
    throw new Error('enabled is required for each feature toggle');
  }
  if (Object.keys(featureToggle.enabled).length !== envs.length) {
    throw new Error(
      'meta.enabled must have all the envs, and no extra envs for each feature toggle'
    );
  }
  if (
    !envs.reduce(
      (acc, env) => (!Object.keys(featureToggle.enabled).includes(env) ? false : acc),
      true
    )
  ) {
    throw new Error('meta.enabled must have a value for every environment for each feature toggle');
  }
  if (featureToggle.value) {
    if (Object.keys(featureToggle.value).length !== envs.length) {
      throw new Error(
        'meta.value must have all the envs, and no extra envs for each feature toggle'
      );
    }
    if (
      !envs.reduce(
        (acc, env) => (!Object.keys(featureToggle.value!).includes(env) ? false : acc),
        true
      )
    ) {
      throw new Error('meta.value must have a value for every environment');
    }
  }
  return true;
};
