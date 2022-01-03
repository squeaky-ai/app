import React from 'react';
import { FeatureFlags, FeatureFlag } from 'lib/feature-flags';

type State = { key: FeatureFlag, value: boolean }[];

type UseFeatureFlags = {
  featureFlags: State, 
  updateFeatureFlag: (key: FeatureFlag, value: boolean) => void;
  featureFlagEnabled: (key: FeatureFlag) => boolean;
}

type Names = Record<FeatureFlag, string>;

export const allFeatureFlags = [
  FeatureFlag.VISITOR_HOTSPOT,
  FeatureFlag.ACTIVE_VISITORS,
];

export const featureFlagNames: Names = {
  [FeatureFlag.VISITOR_HOTSPOT]: 'Visitor hotspot',
  [FeatureFlag.ACTIVE_VISITORS]: 'Active visitors'
};

export const useFeatureFlags = (): UseFeatureFlags => {
  const [state, setState] = React.useState<State>([
    {
      key: FeatureFlag.VISITOR_HOTSPOT,
      value: false,
    },
    {
      key: FeatureFlag.ACTIVE_VISITORS,
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
