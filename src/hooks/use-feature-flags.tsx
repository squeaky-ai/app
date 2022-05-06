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
  FeatureFlag.SHUFFLE_HEATMAPS,
  FeatureFlag.JOURNEYS,
];

export const featureFlagNames: Names = {
  MAGIC_ERASURE: 'Magic Erasure',
  CHEESE_LOADER: 'Cheese Loader',
  SHUFFLE_HEATMAPS: 'Shuffle Heatmaps',
  JOURNEYS: 'Journeys',
};

export const useFeatureFlags = (): UseFeatureFlags => {
  const [state, setState] = React.useState<State>([
    {
      key: FeatureFlag.MAGIC_ERASURE,
      value: false,
    },
    {
      key: FeatureFlag.CHEESE_LOADER,
      value: false,
    },
    {
      key: FeatureFlag.SHUFFLE_HEATMAPS,
      value: false,
    },
    {
      key: FeatureFlag.JOURNEYS,
      value: false,
    },
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
