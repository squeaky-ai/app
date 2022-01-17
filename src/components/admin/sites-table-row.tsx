import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { toNiceDate } from 'lib/dates';
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
    <Cell>
      <a href={site.url} target='_blank' rel='noreferrer'>
        {site.url}
      </a>
    </Cell>
    <Cell>{site.ownerName}</Cell>
    <Cell>{site.plan.name}</Cell>
    <Cell>
      {site.plan.exceeded 
        ? <Pill className='tertiary'>Yes</Pill> 
        : <Pill className='secondary'>No</Pill>
      }
    </Cell>
    <Cell>
      {site.verifiedAt 
        ? <Pill className='primary'>Verified</Pill> 
        : <Pill className='tertiary'>Unverified</Pill> 
      }
    </Cell>
    <Cell>{site.team.length}</Cell>
    <Cell>{toNiceDate(site.createdAt)}</Cell>
  </Row>
);
