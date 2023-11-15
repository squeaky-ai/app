import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { SitesTable } from 'components/admin/sites-table';
import { SiteBundlesStats } from 'components/admin/site-bundles-stats';
import { SiteBundlesCreate } from 'components/admin/site-bundles-create';
import { useAdminSitesBundle } from 'hooks/use-admin-site-bundle';
import type { Column } from 'types/common';
import type { ActiveVisitorCount, AdminSiteSort, SitesBundle } from 'types/graphql';

interface Props {
  bundle: SitesBundle;
  activeVisitors: ActiveVisitorCount[];
  columns: Column[];
  sort: AdminSiteSort;
  setSort: (sort: AdminSiteSort) => void;
}

export const SiteBundlesItem: FC<Props> = ({ 
  bundle,
  activeVisitors,
  columns,
  sort,
  setSort,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const {
    bundle: detailedBundle,
    loading,
    getSiteBundle
  } = useAdminSitesBundle({ bundleId: bundle.id });

  const handleToggle = () => setOpen(!open);

  const isLoading = loading || !detailedBundle;

  React.useEffect(() => {
    if (open) getSiteBundle();
  }, [open]);

  return (
    <div className={classnames('site-bundle', { open })}>
      <div className='heading'>
        <Button onClick={handleToggle}>
          <Icon name={open ? 'subtract-line' : 'add-line'} />
          <b>{bundle.name}</b>
          <span>({bundle.plan.name} Plan)</span>
        </Button>

        <div className='actions'>
          {!isLoading && (
            <SiteBundlesCreate bundle={detailedBundle} />
          )}
        </div>
      </div>

      {open && (
        <>
          {loading && (
            <Spinner />
          )}

          {!isLoading && (
            <>
              <div className='items'>
                <SiteBundlesStats bundle={detailedBundle} />
              </div>

              <div className='items'>
                <SitesTable
                  sites={detailedBundle.sites}
                  sort={sort}
                  activeVisitors={activeVisitors}
                  columns={columns}
                  setSort={setSort}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
