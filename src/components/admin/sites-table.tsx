import React from 'react';
import type { FC } from 'react';
import { Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { SitesTableRow } from 'components/admin/sites-table-row';
import type { Site } from 'types/graphql';
import type { SitesSort } from 'types/admin';

interface Props {
  sites: Site[];
}

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
  }
};

export const SitesTable: FC<Props> = ({ sites }) => {
  const [sort, setSort] = React.useState<SitesSort>('name__asc');

  const results = [...sites].sort(sortSites(sort));

  return (
    <Table className='sites-table'>
      <Row className='head'>
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
      </Row>
      {results.map(site => (
        <SitesTableRow key={site.id} site={site} />
      ))}
    </Table>
  );
};
