import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Sort } from 'components/sort';
import { Tooltip } from 'components/tooltip';
import { VisitorsLargeItem } from 'components/sites/visitors/visitors-large-item';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { COLUMNS } from 'data/visitors/constants';
import { getColumnStyles } from 'lib/tables';
import { Visitors, VisitorsSort } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  site: Site,
  visitors: Visitors;
  search: string;
  columns: Column[];
  sort: VisitorsSort;
  setSort: (sort: VisitorsSort) => void;
}

export const VisitorsLarge: FC<Props> = ({ 
  site,
  visitors,
  search,
  columns,
  sort,
  setSort,
}) => {
  const { items } = visitors;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  return (
    <TableWrapper>
      <Table className={classnames('visitors-list hover', tableClassNames, { hide: items.length === 0 })}>
        <Row head style={rowStyle}>
          <Cell>
            Status
          </Cell>
          <Cell>
            Visitor ID
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            User ID
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            Name
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            Email
          </Cell>
          <Cell>
            Recordings
            <Sort 
              name='recordings' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.RecordingsAsc)} 
              onDesc={() => setSort(VisitorsSort.RecordingsDesc)} 
            />
          </Cell>
          <Cell>
            First visited
            <Sort 
              name='first_viewed_at' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.FirstViewedAtAsc)} 
              onDesc={() => setSort(VisitorsSort.FirstViewedAtDesc)} 
            />
          </Cell>
          <Cell>
            Last activity
            <Sort 
              name='last_activity_at' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.LastActivityAtAsc)} 
              onDesc={() => setSort(VisitorsSort.LastActivityAtDesc)} 
            />
          </Cell>
          <Cell>
            Language
          </Cell>
          <Cell>
            Device &amp; viewport
          </Cell>
          <Cell>
            Browser
          </Cell>
          <Cell>
            Country
          </Cell>
          <Cell />
        </Row>
        {items.map(v => (
          <VisitorsLargeItem 
            site={site} 
            visitor={v} 
            key={v.visitorId} 
            search={search}
            style={rowStyle}
          />
        ))}
      </Table>
    </TableWrapper>
  );
};
