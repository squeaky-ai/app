import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Checkbox } from 'components/checkbox';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Pagination } from 'components/pagination';
import { EventCapturesItem } from 'components/sites/events/event-captures-item';
import { EventsCaptureSort, EventsType } from 'types/graphql';
import type { EventSelected } from 'types/events';
import type { Site, EventsCapture } from 'types/graphql';

interface Props {
  site: Site;
  events: EventsCapture;
  page: number;
  sort: EventsCaptureSort;
  selected: EventSelected[];
  setSort: (sort: EventsCaptureSort) => void;
  setPage: (page: number) => void;
  setSize: (page: number) => void;
  setSelected: (selected: EventSelected[]) => void;
}

export const EventCaptures: FC<Props> = ({ 
  site,
  events,
  sort, 
  page,
  selected,
  setSort,
  setPage,
  setSize,
  setSelected,
}) => {
  const { items } = events;

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => ({ id: t.id, type: EventsType.Capture })))
      : setSelected([]);
  };

  return (
    <>
      <div className='event-captures'>
        <Table className='events-table'>
          <Row head>
            <Cell>
              <Checkbox
                checked={selected.length === items.length && items.length !== 0}
                partial={selected.length !== 0 && selected.length !== items.length && items.length !== 0}
                disabled={items.length === 0}
                onChange={onSelectAll} 
              />
            </Cell>
            <Cell>
              Event name
              <Sort name='name' order={sort} onAsc={() => setSort(EventsCaptureSort.NameAsc)} onDesc={() => setSort(EventsCaptureSort.NameDesc)} />
            </Cell>
            <Cell>Event type</Cell>
            <Cell>Event groups</Cell>
            <Cell>
              Events triggered
              <Sort name='count' order={sort} onAsc={() => setSort(EventsCaptureSort.CountAsc)} onDesc={() => setSort(EventsCaptureSort.CountDesc)} />
            </Cell>
            <Cell />
          </Row>
          {items.map(event => (
            <EventCapturesItem 
              key={event.id}
              site={site}
              event={event}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Table>
      </div>
      <div className='event-captures-footer'>
        <Pagination 
          currentPage={page}
          pageSize={events.pagination.pageSize}
          total={events.pagination.total}
          setPage={setPage}
        />
        <PageSize
          value={events.pagination.pageSize} 
          onChange={setSize}
          show={events.pagination.total > 20}
        />
      </div>
    </>
  );
};
