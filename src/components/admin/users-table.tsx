import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { UsersTableRow } from 'components/admin/users-table-row';
import { Input } from 'components/input';
import { NoResults } from 'components/sites/no-results';
import { UsersColumns } from 'components/admin/users-columns';
import { DEFAULT_USER_COLUMNS } from 'data/admin/constants';
import { getColumnStyles } from 'lib/tables';
import type { Column } from 'types/common';
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
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_USER_COLUMNS);

  const [sort, setSort] = React.useState<UserSort>('created_at__desc');
  const [search, setSearch] = React.useState<string>('');

  const { rowStyle, tableClassNames } = getColumnStyles(DEFAULT_USER_COLUMNS, columns);

  const results = [...users]
    .sort(sortUsers(sort))
    .filter(result => {
      if (!search) return true;

      const keys: Array<keyof User> = ['fullName', 'email'];
      
      return keys.some(key => (result[key] || '').toLowerCase().includes(search.toLowerCase()));
    });

  return (
    <>
      <div className='filters-header'>
        <Input 
          type='text' 
          placeholder='Search...'
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <UsersColumns 
          columns={columns}
          setColumns={setColumns}
        />
      </div>

      {results.length === 0 && (
        <div className='no-search-results'>
          <NoResults 
            illustration='illustration-2'
            title='There are no users that match your search'
          />
        </div>
      )}

      {results.length > 0 && (
        <TableWrapper>
          <Table className={classnames('users-table', tableClassNames)}>
            <Row className='head' style={rowStyle}>
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
              <Cell>Last Activity At</Cell>
            </Row>
            {results.map(user => (
              <UsersTableRow 
                key={user.id} 
                user={user} 
                sites={getUsersSites(user, sites)}
                style={rowStyle}
              />
            ))}
          </Table>
        </TableWrapper>
      )}
    </>
  );
};
