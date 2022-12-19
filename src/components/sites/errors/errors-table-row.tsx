import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Row, Cell } from 'components/table';
import { toNiceDate } from 'lib/dates';
import type { ErrorsItem, Site } from 'types/graphql';

interface Props {
  site: Site;
  error: ErrorsItem;
}

const fromTimestampToIsoString = (timestamp: string) => new Date(Number(timestamp)).toISOString();

export const ErrorsTableRow: FC<Props> = ({ site, error }) => (
  <Row>
    <Cell>{error.message}</Cell>
    <Cell>
      <Link href={`/sites/${site.id}/errors/${error.id}`}>
        {error.errorCount.toLocaleString()}
      </Link>
    </Cell>
    <Cell>{error.recordingCount.toLocaleString()}</Cell>
    <Cell>{toNiceDate(fromTimestampToIsoString(error.lastOccurance))}</Cell>
  </Row>
);
