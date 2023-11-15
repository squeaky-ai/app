import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { Icon } from 'components/icon';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { UsersDelete } from 'components/admin/users-delete';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
  style?: React.CSSProperties;
}

const { publicRuntimeConfig } = getConfig();

export const UsersTableRow: FC<Props> = ({ user, style }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
      <Cell>{user.id}</Cell>
      <Cell>
        <Link href={`/__admin/users/${user.id}`}>
          {user.fullName || '-'}
        </Link>
        {!!user.partner && (
          <span className='partnered'>
            <Icon name='user-star-line' />
          </span>
        )}
      </Cell>
      <Cell>{user.email}</Cell>
      <Cell>
        {user.visitor 
          ? <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${user.visitor.id}`}>{user.visitor.visitorId}</Link>
          : '-'
        }
      </Cell>
      <Cell>
        {user.superuser 
          ? <Pill className='tertiary'>Yes</Pill>
          : <Pill className='secondary'>No</Pill>
        }
      </Cell>
      <Cell>
        {user.sites.map((site, index) => (
          <React.Fragment key={site.id}>
            <Link href={`/__admin/sites/${site.id}`} target='_blank'>
              {site.name}
            </Link>
            {index === user.sites.length -1 ? '' : ', '}
          </React.Fragment>
        ))}
        {user.sites.length === 0 && '-'}
      </Cell>
      <Cell>{user.createdAt.niceDateTime}</Cell>
      <Cell>{user.lastActivityAt ? user.lastActivityAt.niceDateTime : '-'}</Cell>
      <Cell>{user.provider || '-'}</Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <UsersDelete 
            user={user} 
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
