import React from 'react';
import type { FC } from 'react';
import { Table, Cell, Row } from 'components/table';
import { UsersTableRow } from 'components/admin/users-table-row';
import type { User } from 'types/graphql';

interface Props {
  users: User[];
}

export const UsersTable: FC<Props> = ({ users }) => (
  <Table className='users-table'>
    <Row className='head'>
      <Cell>ID</Cell>
      <Cell>Name</Cell>
      <Cell>Email</Cell>
      <Cell>Superuser</Cell>
      <Cell>Created At</Cell>
    </Row>
    {users.map(user => (
      <UsersTableRow key={user.id} user={user} />
    ))}
  </Table>
);
