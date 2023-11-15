import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { Card } from 'components/card';
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
          ? <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${user.visitor.id}`}>{user.visitor.visitorId}</Link>
          : '-'
        }
      </span>
    </p>
    <p>
      <b>Sites</b>
      <span>
        {user.sites.map((site, index) => (
          <React.Fragment key={site.id}>
            <Link href={`/__admin/sites/${site.id}`} target='_blank'>
              {site.name}
            </Link>
            {index === user.sites.length -1 ? '' : ', '}
          </React.Fragment>
        ))}
        {user.sites.length === 0 && '-'}
      </span>
    </p>
    <p>
      <b>Created at</b>
      <span>{user.createdAt.niceDateTime}</span>
    </p>
    <p>
      <b>Last activity at</b>
      <span>{user.lastActivityAt ? user.lastActivityAt.niceDateTime : '-'}</span>
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
    <p>
      <b>Provider</b>
      <span>{user.provider || '-'}</span>
    </p>
    {user.partner && (
      <>
        <p>
          <b>Partner Company Name</b>
          <span>{user.partner.name}</span>
        </p>
        <p>
          <b>Partner Company Slug</b>
          <span>{user.partner.slug}</span>
        </p>
      </>
    )}
  </Card>
);
