import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { SitesTable } from 'components/admin/sites-table';
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

  const handleToggle = () => setOpen(!open);

  return (
    <div className={classnames('site-bundle', { open })}>
      <Button className='heading' onClick={handleToggle}>
        <Icon name={open ? 'subtract-line' : 'add-line'} />
        <b>{bundle.name}</b>
        <span>({bundle.plan.name} Plan)</span>
      </Button>

      <div className='items'>
        <SitesTable
          sites={bundle.sites}
          sort={sort}
          activeVisitors={activeVisitors}
          columns={columns}
          setSort={setSort}
        />
      </div>
    </div>
  );
};
