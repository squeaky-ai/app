import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Cell, Row } from 'components/table';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const SitesTableRow: FC<Props> = ({ site }) => (
  <Row>
    <Cell>
      <Link href={`/sites/${site.id}/dashboard`}>
        <a target='_blank'>{site.id}</a>
      </Link>
    </Cell>
    <Cell>{site.name}</Cell>
    <Cell>{site.url}</Cell>
    <Cell>{site.ownerName}</Cell>
    <Cell>{site.plan.name}</Cell>
    <Cell>{site.plan.exceeded ? 'Yes' : 'No'}</Cell>
    <Cell>{site.verifiedAt ? 'Verified' : 'Unverified'}</Cell>
    <Cell>{site.team.length}</Cell>
  </Row>
);
