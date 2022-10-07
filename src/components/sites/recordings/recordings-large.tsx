import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { RecordingsLargeItem } from 'components/sites/recordings/recordings-large-item';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { Tooltip } from 'components/tooltip';
import { Checkbox } from 'components/checkbox';
import { COLUMNS } from 'data/recordings/constants';
import { getColumnStyles } from 'lib/tables';
import { Recordings, RecordingsSort } from 'types/graphql';
import type { Column } from 'types/common';
import type { Site, Team } from 'types/graphql';

interface Props {
  recordings: Recordings;
  site: Site;
  columns: Column[];
  member?: Team;
  sort: RecordingsSort;
  selected: string[];
  setSort: (sort: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const RecordingsLarge: FC<Props> = ({ 
  recordings,
  site,
  columns, 
  member,
  sort,
  selected, 
  setSort,
  setSelected 
}) => {
  const { items } = recordings;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => t.id))
      : setSelected([]);
  };

  return (
    <TableWrapper>
      <Table className={classnames('recordings-list hover', tableClassNames, { hide: items.length === 0 })}>
        <Row head style={rowStyle}>
          <Cell>
            <Checkbox
              checked={selected.length === items.length && items.length !== 0}
              partial={selected.length !== 0 && selected.length !== items.length && items.length !== 0}
              disabled={items.length === 0}
              onChange={onSelectAll} 
            />
          </Cell>
          <Cell>Status</Cell>
          <Cell>Recording ID</Cell>
          <Cell>Visitor ID</Cell>
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
          <Cell>Date &amp; Time<Sort name='connected_at' order={sort} onAsc={() => setSort(RecordingsSort.ConnectedAtAsc)} onDesc={() => setSort(RecordingsSort.ConnectedAtDesc)} /></Cell>
          <Cell>Duration <Sort name='duration' order={sort} onAsc={() => setSort(RecordingsSort.DurationAsc)} onDesc={() => setSort(RecordingsSort.DurationDesc)} /></Cell>
          <Cell>Activity <Sort name='activity' order={sort} onAsc={() => setSort(RecordingsSort.ActivityAsc)} onDesc={() => setSort(RecordingsSort.ActivityDesc)} /></Cell>
          <Cell>Pages <Sort name='page_count' order={sort} onAsc={() => setSort(RecordingsSort.PageCountAsc)} onDesc={() => setSort(RecordingsSort.PageCountDesc)} /></Cell>
          <Cell>Traffic Source</Cell>
          <Cell>Start &amp; Exit URL</Cell>
          <Cell>Device &amp; Viewport (px)</Cell>
          <Cell>Country</Cell>
          <Cell>Browser</Cell>
          <Cell>NPS</Cell>
          <Cell>Sentiment</Cell>
          <Cell />
        </Row>
        
        {items.map(recording => (
          <RecordingsLargeItem 
            site={site}
            recording={recording} 
            key={recording.id} 
            style={rowStyle}
            selected={selected}
            member={member}
            setSelected={setSelected}
          />
        ))}
      </Table>
    </TableWrapper>
  );
};
