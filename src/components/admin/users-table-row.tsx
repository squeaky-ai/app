import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { toNiceDate } from 'lib/dates';
import type { User, Site } from 'types/graphql';

interface Props {
  user: User;
  sites: Site[];
}

export const UsersTableRow: FC<Props> = ({ user, sites }) => (
  <Row>
    <Cell>{user.id}</Cell>
    <Cell>{user.fullName || '-'}</Cell>
    <Cell>{user.email}</Cell>
    <Cell>
      {user.superuser 
        ? <Pill className='tertiary'>Yes</Pill>
        : <Pill className='secondary'>No</Pill>
      }
    </Cell>
    <Cell>
      {sites.map((site, index) => (
        <React.Fragment key={site.id}>
          <Link href={`/sites/${site.id}/dashboard`}>
            <a>{site.name}</a>
          </Link>
          {index === sites.length -1 ? '' : ', '}
        </React.Fragment>
      ))}
    </Cell>
    <Cell>{toNiceDate(user.createdAt)}</Cell>
  </Row>
);
