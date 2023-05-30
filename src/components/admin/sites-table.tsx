import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { SitesTableRow } from 'components/admin/sites-table-row';
import { NoResults } from 'components/sites/no-results';
import { DEFAULT_SITE_COLUMNS } from 'data/admin/constants';
import { getColumnStyles } from 'lib/tables';
import { AdminSiteSort } from 'types/graphql';
import type { Column } from 'types/common';
import type { ActiveVisitorCount, AdminSite } from 'types/graphql';

interface Props {
  sites: AdminSite[];
  activeVisitors: ActiveVisitorCount[];
  columns: Column[];
  sort: AdminSiteSort;
  setSort: (sort: AdminSiteSort) => void;
}

export const SitesTable: FC<Props> = ({ sites, activeVisitors, columns, sort, setSort }) => {
  const { rowStyle, tableClassNames } = getColumnStyles(DEFAULT_SITE_COLUMNS, columns);

  const getSiteActiveVisitorsCount = (uuid: string) => {
    return activeVisitors.find(a => a.siteId === uuid)?.count || 0;
  };

  return (
    <>
      {sites.length === 0 && (
        <div className='no-search-results'>
          <NoResults 
            illustration='illustration-2'
            title='There are no sites that match your search'
          />
        </div>
      )}

      <TableWrapper>
        <Table className={classnames('sites-table', tableClassNames, { hide: sites.length === 0 })}>
          <Row className='head' style={rowStyle}>
            <Cell>ID</Cell>
            <Cell>
              Name
              <Sort 
                name='name' 
                order={sort} 
                onAsc={() => setSort(AdminSiteSort.NameAsc)} 
                onDesc={() => setSort(AdminSiteSort.NameDesc)} 
              />
            </Cell>
            <Cell>Url</Cell>
            <Cell>Owner Name</Cell>
            <Cell>Plan Name</Cell>
            <Cell>Plan Exceeded</Cell>
            <Cell>Tracking Code Status</Cell>
            <Cell>Team Count</Cell>
            <Cell>Provider</Cell>
            <Cell>Trial Status</Cell>
            <Cell>
              Created At
              <Sort 
                name='created_at' 
                order={sort} 
                onAsc={() => setSort(AdminSiteSort.CreatedAtAsc)} 
                onDesc={() => setSort(AdminSiteSort.CreatedAtDesc)} 
              />
            </Cell>
            <Cell>Active Visitors</Cell>
            <Cell>CS Access</Cell>
          </Row>
          {sites.map(site => (
            <SitesTableRow 
              key={site.id} 
              site={site}
              activeVisitors={getSiteActiveVisitorsCount(site.uuid)}
              style={rowStyle}
            />
          ))}
        </Table>
      </TableWrapper>
    </>
  );
};
