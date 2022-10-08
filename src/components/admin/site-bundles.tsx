import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { useAdminSitesBundles } from 'hooks/use-admin-sites-bundles';
import { SiteBundlesItem } from 'components/admin/site-bundles-item';
import type { Column } from 'types/common';
import type { ActiveVisitorCount, AdminSiteSort } from 'types/graphql';

interface Props {
  activeVisitors: ActiveVisitorCount[];
  columns: Column[];
  sort: AdminSiteSort;
  setSort: (sort: AdminSiteSort) => void;
}

export const SiteBundles: FC<Props> = ({
  activeVisitors,
  columns,
  sort,
  setSort,
}) => {
  const { bundles, loading, error } = useAdminSitesBundles();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='site-bundles'>
      {bundles.length === 0 && (
        <p>No bundles configured...</p>
      )}

      {bundles.map(bundle => (
        <SiteBundlesItem 
          key={bundle.id}
          bundle={bundle} 
          activeVisitors={activeVisitors}
          columns={columns}
          sort={sort}
          setSort={setSort}
        />
      ))}
    </div>
  );
};
