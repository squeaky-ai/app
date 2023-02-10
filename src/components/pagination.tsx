import React from 'react';
import type { FC } from 'react';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';
import { Pagination as NewPagination } from 'components/pagination-new';
import { Pagination as OldPagination } from 'components/pagination-old';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  currentPage: number;
  pageSize: number;
  total: number;
  scrollToTop?: boolean;
  setPage: (page: number) => void;
}

export const Pagination: FC<Props> = (props) => {
  const { featureFlagEnabled } = useFeatureFlags();

  return featureFlagEnabled(FeatureFlag.SIMPLIFIED_PAGINATION)
    ? <NewPagination {...props} />
    : <OldPagination {...props} />
};
