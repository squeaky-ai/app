import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { SitesTableRow } from 'components/admin/sites-table-row';
import { NoResults } from 'components/sites/no-results';
import { DEFAULT_SITE_COLUMNS } from 'data/admin/constants';
import { getColumnStyles } from 'lib/tables';
import type { Column } from 'types/common';
import type { SitesSort } from 'types/admin';
import type { ActiveVisitorCount, Site } from 'types/graphql';

interface Props {
  sites: Site[];
  activeVisitors: ActiveVisitorCount[];
  search: string;
  columns: Column[];
}

export const SitesTable: FC<Props> = ({ sites, activeVisitors, search, columns }) => {
  const [sort, setSort] = React.useState<SitesSort>('created_at__desc');
  const { rowStyle, tableClassNames } = getColumnStyles(DEFAULT_SITE_COLUMNS, columns);

  const getSiteActiveVisitorsCount = (uuid: string) => {
    return activeVisitors.find(a => a.siteId === uuid)?.count || 0;
  };

  const sortSites = (sort: SitesSort) => (a: Site, b: Site) => {
    switch(sort) {
      case 'name__asc':
        return a.name.localeCompare(b.name );
      case 'name__desc':
        return b.name.localeCompare(a.name);
      case 'plan_name__asc':
        return a.plan.name.localeCompare(b.plan.name);
      case 'plan_name__desc':
        return b.plan.name.localeCompare(a.plan.name);
      case 'team_count__asc':
        return a.team.length - b.team.length;
      case 'team_count__desc':
        return b.team.length - a.team.length;
      case 'created_at__asc':
        return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
      case 'created_at__desc':
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
      case 'active_visitors__asc':
        return getSiteActiveVisitorsCount(a.uuid) - getSiteActiveVisitorsCount(b.uuid);
      case 'active_visitors__desc':
        return getSiteActiveVisitorsCount(b.uuid) - getSiteActiveVisitorsCount(a.uuid);
    }
  };

  const results = [...sites]
    .sort(sortSites(sort))
    .filter(result => {
      if (!search) return true;

      const keys: Array<keyof Site> = ['name', 'url', 'ownerName'];
      
      return keys.some(key => (result[key] || '').toLowerCase().includes(search.toLowerCase()));
    });

  return (
    <>
      {results.length === 0 && (
        <div className='no-search-results'>
          <NoResults 
            illustration='illustration-2'
            title='There are no sites that match your search'
          />
        </div>
      )}

      <TableWrapper>
        <Table className={classnames('sites-table', tableClassNames, { hide: results.length === 0 })}>
          <Row className='head' style={rowStyle}>
            <Cell>ID</Cell>
            <Cell>
              Name
              <Sort 
                name='name' 
                order={sort} 
                onAsc={() => setSort('name__asc')} 
                onDesc={() => setSort('name__desc')} 
              />
            </Cell>
            <Cell>Url</Cell>
            <Cell>Owner Name</Cell>
            <Cell>
              Plan Name
              <Sort 
                name='plan_name' 
                order={sort} 
                onAsc={() => setSort('plan_name__asc')} 
                onDesc={() => setSort('plan_name__desc')} 
              />
            </Cell>
            <Cell>Plan Exceeded</Cell>
            <Cell>Tracking Code Status</Cell>
            <Cell>
              Team Count
              <Sort 
                name='team_count' 
                order={sort} 
                onAsc={() => setSort('team_count__asc')} 
                onDesc={() => setSort('team_count__desc')} 
              />
            </Cell>
            <Cell>
              Created At
              <Sort 
                name='created_at' 
                order={sort} 
                onAsc={() => setSort('created_at__asc')} 
                onDesc={() => setSort('created_at__desc')} 
              />
            </Cell>
            <Cell>
              Active Visitors
              <Sort 
                name='active_visitors' 
                order={sort} 
                onAsc={() => setSort('active_visitors__asc')} 
                onDesc={() => setSort('active_visitors__desc')} 
              />
            </Cell>
            <Cell>
              Superuser Access
            </Cell>
          </Row>
          {results.map(site => (
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
