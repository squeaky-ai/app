import React from 'react';
import type { FC } from 'react';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { UsersTableRow } from 'components/admin/users-table-row';
import type { User, Site } from 'types/graphql';
import type { UserSort } from 'types/admin';

interface Props {
  users: User[];
  sites: Site[];
}

const sortUsers = (sort: UserSort) => (a: User, b: User) => {
  switch(sort) {
    case 'name__asc':
      return (a.fullName || '').localeCompare(b.fullName || '');
    case 'name__desc':
      return (b.fullName || '').localeCompare(a.fullName || '');
    case 'superuser__asc':
      return a.superuser ? 1 : 0;
    case 'superuser__desc':
      return a.superuser ? 0 : 1;
    case 'created_at__asc':
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
    case 'created_at__desc':
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  }
};

const getUsersSites = (user: User, sites: Site[]) => {
  return sites.filter(site => !!site.team.find(t => t.user.id === user.id));
};

export const UsersTable: FC<Props> = ({ users, sites }) => {
  const [sort, setSort] = React.useState<UserSort>('created_at__desc');

  const results = [...users].sort(sortUsers(sort));

  return (
    <TableWrapper>
      <Table className='users-table'>
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
          <Cell>Email</Cell>
          <Cell>
            Superuser
            <Sort 
              name='superuser' 
              order={sort} 
              onAsc={() => setSort('superuser__asc')} 
              onDesc={() => setSort('superuser__desc')} 
            />
          </Cell>
          <Cell>Sites</Cell>
          <Cell>
            Created At
            <Sort 
              name='created_at' 
              order={sort} 
              onAsc={() => setSort('created_at__asc')} 
              onDesc={() => setSort('created_at__desc')} 
            />
          </Cell>
        </Row>
        {results.map(user => (
          <UsersTableRow key={user.id} user={user} sites={getUsersSites(user, sites)} />
        ))}
      </Table>
    </TableWrapper>
  );
};
