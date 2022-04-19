import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { Cheese } from 'components/cheese';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';

export const PageLoading: FC = () => {
  const { featureFlagEnabled } = useFeatureFlags();

  return (
    <div className='page-loading'>
      {featureFlagEnabled(FeatureFlag.CHEESE_LOADER)
        ? <Cheese />
        : <Spinner /> 
      }
    </div>
  );
};
