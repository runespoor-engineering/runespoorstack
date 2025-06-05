import { FeatureToggles } from '../../../types';
import { createFeatureToggles } from '../createFeatureToggles';

describe('createFeatureToggles', () => {
  const mockEnvs = ['dev', 'prod'] as const;
  const mockFulfilledFeatureToggles: FeatureToggles<typeof mockEnvs> = {
    feature1: {
      meta: {
        description: 'Feature 1',
        createdAt: '2023-01-01T00:00:00Z',
        createdBy: 'John Doe'
      },
      enabled: { dev: true, prod: false },
      value: { dev: 'value1', prod: 'value2' }
    },
    feature2: {
      meta: {
        description: 'Feature 2',
        createdAt: '2023-01-02T00:00:00Z',
        createdBy: 'Jane Doe'
      },
      enabled: { dev: false, prod: true }
    }
  };

  it('should validate all feature toggles and throw an error if any does not have `meta` object', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        enabled: { dev: false, prod: true }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta is required for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any does not have `meta.createdAt` value', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdBy: 'Jane Doe'
        },
        enabled: { dev: false, prod: true }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.createdAt is required for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any does not have `meta.createdBy` value', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z'
        },
        enabled: { dev: false, prod: true }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.createdBy is required for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any does not have `enabled` object', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z',
          createdBy: 'Jane Doe'
        }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('enabled is required for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any has `enabled` object with an extra envs', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z',
          createdBy: 'Jane Doe'
        },
        enabled: { dev: false, prod: true, extra: true }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.enabled must have all the envs, and no extra envs for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any does not have `enabled` object with all the envs', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z',
          createdBy: 'Jane Doe'
        },
        enabled: { dev: false }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.enabled must have all the envs, and no extra envs for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any has `value` object with an extra envs', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z',
          createdBy: 'Jane Doe'
        },
        enabled: { dev: false, prod: true },
        value: { dev: 'value1', prod: 'value2', extra: 'value3' }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.value must have all the envs, and no extra envs for each feature toggle');
  });

  it('should validate all feature toggles and throw an error if any does not have `value` object with all the envs', () => {
    expect.hasAssertions();

    const mockInvalidFeatureToggles = {
      feature1: {
        meta: {
          description: 'Feature 1',
          createdAt: '2023-01-01T00:00:00Z',
          createdBy: 'John Doe'
        },
        enabled: { dev: true, prod: false },
        value: { dev: 'value1', prod: 'value2' }
      },
      feature2: {
        meta: {
          description: 'Feature 2',
          createdAt: '2023-01-02T00:00:00Z',
          createdBy: 'Jane Doe'
        },
        enabled: { dev: false, prod: true },
        value: { dev: 'value1' }
      }
    } as unknown as FeatureToggles<typeof mockEnvs>;

    expect(() =>
      createFeatureToggles({
        featureToggles: mockInvalidFeatureToggles,
        envs: mockEnvs,
        env: 'dev'
      })
    ).toThrow('meta.value must have all the envs, and no extra envs for each feature toggle');
  });

  it('should return an object with `getFeatureToggle` function', () => {
    expect.hasAssertions();

    const result = createFeatureToggles({
      featureToggles: mockFulfilledFeatureToggles,
      envs: mockEnvs,
      env: 'dev'
    });

    expect(result).toHaveProperty('getFeatureToggle');
    expect(typeof result.getFeatureToggle).toBe('function');
  });

  it('should return correct feature toggle for the provided environment by calling `getFeatureToggle` with the feature toggle key', () => {
    expect.hasAssertions();

    const { getFeatureToggle } = createFeatureToggles({
      featureToggles: mockFulfilledFeatureToggles,
      envs: mockEnvs,
      env: 'dev'
    });
    const feature1 = getFeatureToggle('feature1');
    const feature2 = getFeatureToggle('feature2');

    expect(feature1).toStrictEqual({
      meta: {
        description: 'Feature 1',
        createdAt: '2023-01-01T00:00:00Z',
        createdBy: 'John Doe'
      },
      enabled: true,
      value: 'value1'
    });
    expect(feature2).toStrictEqual({
      meta: {
        description: 'Feature 2',
        createdAt: '2023-01-02T00:00:00Z',
        createdBy: 'Jane Doe'
      },
      enabled: false,
      value: undefined
    });
  });

  it('should return `null` if the feature toggle does not exist on calling `getFeatureToggle` with the feature toggle key', () => {
    expect.hasAssertions();

    const { getFeatureToggle } = createFeatureToggles({
      featureToggles: mockFulfilledFeatureToggles,
      envs: mockEnvs,
      env: 'dev'
    });

    expect(getFeatureToggle('feature3')).toBeNull();
  });
});
