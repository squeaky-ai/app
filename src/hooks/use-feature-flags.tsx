import React from 'react';
import { FeatureFlags, FeatureFlag } from 'lib/feature-flags';

type State = { 
  key: FeatureFlag, 
  value: boolean, 
  superuser: boolean,
  description: string;
}[];

type UseFeatureFlags = {
  featureFlags: State, 
  updateFeatureFlag: (key: FeatureFlag, value: boolean) => void;
  featureFlagEnabled: (key: FeatureFlag) => boolean;
}

type Names = Record<FeatureFlag, string>;

export const allFeatureFlags: FeatureFlag[] = [
  FeatureFlag.CHEESE_LOADER,
];

export const featureFlagNames: Names = {
  CHEESE_LOADER: 'Cheese Loader',
};

const options: State = [
  {
    key: FeatureFlag.CHEESE_LOADER,
    value: false,
    superuser: false,
    description: 'Replace the standard spinner with a cheesy Squeaky one',
  },
];

export const useFeatureFlags = (): UseFeatureFlags => {
  const [state, setState] = React.useState<State>(options);

  const handleChange = (key: FeatureFlag, value: boolean) => {
    FeatureFlags.set(key, value);

    const flags: State = state.map(s => s.key === key 
      ? { key, value, superuser: s.superuser, description: s.description, } 
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
      const option = options.find(o => o.key === flag);

      return { 
        key: flag, 
        value: FeatureFlags.get(flag), 
        superuser: option?.superuser ?? true,
        description: option?.description || '',
      };
    }, []);

    setState(stored);
  }, []);

  return { 
    featureFlags: state,
    updateFeatureFlag: handleChange,
    featureFlagEnabled,
  };
};
