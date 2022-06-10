import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
}

export const EventHistoryFeed: FC<Props> = () => {
  return (
    <div className='event-history-table event-history-feed'>
      <Table>
        <Row head>
          <Cell>Date &amp; Time</Cell>
          <Cell>Event Name</Cell>
          <Cell>Visitor ID</Cell>
          <Cell>Recording ID</Cell>
        </Row>
      </Table>
    </div>
  );
};
