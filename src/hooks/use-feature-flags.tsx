import React from 'react';
import { FeatureFlags, FeatureFlag } from 'lib/feature-flags';

type State = { key: FeatureFlag, value: boolean }[];

type UseFeatureFlags = {
  featureFlags: State, 
  updateFeatureFlag: (key: FeatureFlag, value: boolean) => void;
  featureFlagEnabled: (key: FeatureFlag) => boolean;
}

type Names = Record<FeatureFlag, string>;

export const allFeatureFlags: FeatureFlag[] = [
  FeatureFlag.MAGIC_ERASURE,
  FeatureFlag.CHEESE_LOADER,
];

export const featureFlagNames: Names = {
  MAGIC_ERASURE: 'Magic Erasure',
  CHEESE_LOADER: 'Cheese Loader',
};

export const useFeatureFlags = (): UseFeatureFlags => {
  const [state, setState] = React.useState<State>([
    {
      key: FeatureFlag.MAGIC_ERASURE,
      value: false,
    }
  ]);

  const handleChange = (key: FeatureFlag, value: boolean) => {
    FeatureFlags.set(key, value);

    const flags: State = state.map(s => s.key === key 
      ? { key, value } 
      : s
    );

    setState(flags);
  };

  const featureFlagEnabled = (key: FeatureFlag): boolean => {
    const flag = state.find(s => s.key === key);
    return flag?.value || false;
  };

  React.useEffect(() => {
    const stored = allFeatureFlags.map(flag => {
      return { key: flag, value: FeatureFlags.get(flag) };
    }, []);

    setState(stored);
  }, []);

  return { 
    featureFlags: state,
    updateFeatureFlag: handleChange,
    featureFlagEnabled,
  };
};
