import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { UsersTableRow } from 'components/admin/users-table-row';
import { NoResults } from 'components/sites/no-results';
import { DEFAULT_USER_COLUMNS } from 'data/admin/constants';
import { getColumnStyles } from 'lib/tables';
import { AdminUserSort } from 'types/graphql';
import type { Column } from 'types/common';
import type { AdminUser } from 'types/graphql';

interface Props {
  users: AdminUser[];
  columns: Column[];
  sort: AdminUserSort;
  setSort: (sort: AdminUserSort) => void;
}

export const UsersTable: FC<Props> = ({ users, columns, sort, setSort }) => {
  const { rowStyle, tableClassNames } = getColumnStyles(DEFAULT_USER_COLUMNS, columns);

  return (
    <>
      {users.length === 0 && (
        <div className='no-search-results'>
          <NoResults 
            illustration='illustration-2'
            title='There are no users that match your search'
          />
        </div>
      )}

      <TableWrapper>
        <Table className={classnames('users-table', tableClassNames, { hide: users.length === 0 })}>
          <Row className='head' style={rowStyle}>
            <Cell>ID</Cell>
            <Cell>
              Name
              <Sort 
                name='name' 
                order={sort} 
                onAsc={() => setSort(AdminUserSort.NameAsc)} 
                onDesc={() => setSort(AdminUserSort.NameDesc)} 
              />
            </Cell>
            <Cell>Email</Cell>
            <Cell>Visitor</Cell>
            <Cell>Superuser</Cell>
            <Cell>Sites</Cell>
            <Cell>
              Created At
              <Sort 
                name='created_at' 
                order={sort} 
                onAsc={() => setSort(AdminUserSort.CreatedAtAsc)} 
                onDesc={() => setSort(AdminUserSort.CreatedAtDesc)} 
              />
            </Cell>
            <Cell>
              Last Activity At
              <Sort 
                name='last_activity_at' 
                order={sort} 
                onAsc={() => setSort(AdminUserSort.LastActivityAtAsc)} 
                onDesc={() => setSort(AdminUserSort.LastActivityAtDesc)} 
              />
            </Cell>
            <Cell />
          </Row>
          {users.map(user => (
            <UsersTableRow 
              key={user.id} 
              user={user}
              style={rowStyle}
            />
          ))}
        </Table>
      </TableWrapper>
    </>
  );
};
