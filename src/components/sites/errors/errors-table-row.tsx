import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Row, Cell } from 'components/table';
import type { ErrorsItem, Site } from 'types/graphql';

interface Props {
  site: Site;
  error: ErrorsItem;
}

export const ErrorsTableRow: FC<Props> = ({ site, error }) => (
  <Row>
    <Cell>{error.message}</Cell>
    <Cell>
      <Link href={`/sites/${site.id}/errors/${error.id}`}>
        {error.errorCount.toLocaleString()}
      </Link>
    </Cell>
    <Cell>{error.recordingCount.toLocaleString()}</Cell>
    <Cell>{error.lastOccurance.niceDateTime}</Cell>
  </Row>
);
