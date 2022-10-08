import React from 'react';
import type { FC } from 'react';
import { Row, Cell } from 'components/table';
import { toNiceDate } from 'lib/dates';
import type { ErrorsItem } from 'types/graphql';

interface Props {
  error: ErrorsItem;
}

const fromTimestampToIsoString = (timestamp: string) => new Date(Number(timestamp)).toISOString();

export const ErrorsTableRow: FC<Props> = ({ error }) => (
  <Row>
    <Cell>{error.message}</Cell>
    <Cell>{error.errorCount}</Cell>
    <Cell>{error.recordingCount}</Cell>
    <Cell>{toNiceDate(fromTimestampToIsoString(error.lastOccurance))}</Cell>
  </Row>
);
