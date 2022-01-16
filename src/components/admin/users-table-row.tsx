import React from 'react';
import type { FC } from 'react';
import { Cell, Row } from 'components/table';
import { toNiceDate } from 'lib/dates';
import type { User } from 'types/graphql';

interface Props {
  user: User;
}

export const UsersTableRow: FC<Props> = ({ user }) => (
  <Row>
    <Cell>{user.id}</Cell>
    <Cell>{user.fullName || '-'}</Cell>
    <Cell>{user.email}</Cell>
    <Cell>{user.superuser ? 'Yes' : 'No'}</Cell>
    <Cell>{toNiceDate(user.createdAt)}</Cell>
  </Row>
);
