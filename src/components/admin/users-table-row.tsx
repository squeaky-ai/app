import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { toNiceDate } from 'lib/dates';
import { Dropdown } from 'components/dropdown';
import { UsersDelete } from 'components/admin/users-delete';
import type { User, Site } from 'types/graphql';

interface Props {
  user: User;
  sites: Site[];
  style?: React.CSSProperties;
}

export const UsersTableRow: FC<Props> = ({ user, sites, style }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
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
              <a target='_blank'>{site.name}</a>
            </Link>
            {index === sites.length -1 ? '' : ', '}
          </React.Fragment>
        ))}
        {sites.length === 0 && '-'}
      </Cell>
      <Cell>{toNiceDate(user.createdAt)}</Cell>
      <Cell>{user.lastActivityAt ? toNiceDate(user.lastActivityAt) : '-'}</Cell>
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
