import React from 'react';
import type { FC } from 'react';
import { Table, Cell, Row } from 'components/table';
import { SitesTableRow } from 'components/admin/sites-table-row';
import type { Site } from 'types/graphql';

interface Props {
  sites: Site[];
}

export const SitesTable: FC<Props> = ({ sites }) => (
  <Table className='sites-table'>
    <Row className='head'>
      <Cell>ID</Cell>
      <Cell>Name</Cell>
      <Cell>Url</Cell>
      <Cell>Owner Name</Cell>
      <Cell>Plan Name</Cell>
      <Cell>Plan Exceeded</Cell>
      <Cell>Tracking Code Status</Cell>
      <Cell>Team Count</Cell>
    </Row>
    {sites.map(site => (
      <SitesTableRow key={site.id} site={site} />
    ))}
  </Table>
);
