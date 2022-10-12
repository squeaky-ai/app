import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { Card } from 'components/card';
import { toNiceDate } from 'lib/dates';
import { Pill } from 'components/pill';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

const { publicRuntimeConfig } = getConfig();

export const User: FC<Props> = ({ user }) => (
  <Card className='user-details'>
    <p>
      <b>Name</b>
      <span>{user.fullName}</span>
    </p>
    <p>
      <b>Email</b>
      <span>{user.email}</span>
    </p>
    <p>
      <b>Visitor ID</b>
      <span>
        {user.visitor 
          ? <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${user.visitor.id}`}><a>{user.visitor.visitorId}</a></Link>
          : '-'
        }
      </span>
    </p>
    <p>
      <b>Sites</b>
      <span>
        {user.sites.map((site, index) => (
          <React.Fragment key={site.id}>
            <Link href={`/sites/${site.id}/dashboard`}>
              <a target='_blank'>{site.name}</a>
            </Link>
            {index === user.sites.length -1 ? '' : ', '}
          </React.Fragment>
        ))}
        {user.sites.length === 0 && '-'}
      </span>
    </p>
    <p>
      <b>Created at</b>
      <span>{toNiceDate(user.createdAt)}</span>
    </p>
    <p>
      <b>Last activity at</b>
      <span>{user.lastActivityAt ? toNiceDate(user.lastActivityAt) : '-'}</span>
    </p>
    <p>
      <b>Superuser</b>
      <span>
        {user.superuser 
          ? <Pill className='tertiary'>Yes</Pill>
          : <Pill className='secondary'>No</Pill>
        }
      </span>
    </p>
  </Card>
);