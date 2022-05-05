import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Sort } from 'components/sort';
import { Checkbox } from 'components/checkbox';
import { RecordingsLargeItem } from 'components/sites/recordings/recordings-large-item';
import { Table, Row, Cell } from 'components/table';
import { getColumnStyles } from 'lib/tables';
import { RecordingsSort } from 'types/graphql';
import { COLUMNS } from 'data/recordings/constants';
import type { Visitor, Site, Team } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  visitor: Visitor;
  sort: RecordingsSort;
  site: Site;
  columns: Column[];
  selected: string[];
  member: Team;
  setSort: (value: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const VisitorsRecordingsLarge: FC<Props> = ({ site, visitor, sort, columns, selected, member, setSelected, setSort }) => {
  const { items } = visitor.recordings;

  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => t.id))
      : setSelected([]);
  };

  return (
    <Table className={classnames('visitor-recordings-table hover', tableClassNames)}>
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
        <Cell>Date &amp; Time<Sort name='connected_at' order={sort} onAsc={() => setSort(RecordingsSort.ConnectedAtAsc)} onDesc={() => setSort(RecordingsSort.ConnectedAtDesc)} /></Cell>
        <Cell>Duration <Sort name='duration' order={sort} onAsc={() => setSort(RecordingsSort.DurationAsc)} onDesc={() => setSort(RecordingsSort.DurationDesc)} /></Cell>
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
          member={member}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </Table>
  );
};
