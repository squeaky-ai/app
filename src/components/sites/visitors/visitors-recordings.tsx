import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { Sort } from 'components/sort';
import { Checkbox } from 'components/checkbox';
import { Illustration } from 'components/illustration';
import { RecordingsItem } from 'components/sites/recordings/recordings-item';
import { Table, Row, Cell } from 'components/table';
import { getColumnStyles } from 'lib/tables';
import { RecordingsSort, Site } from 'types/graphql';
import { COLUMNS } from 'data/recordings/constants';
import type { Visitor } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  visitor: Visitor;
  sort: RecordingsSort;
  page: number;
  site: Site;
  columns: Column[];
  selected: string[];
  setPage: (value: number) => void;
  setSort: (value: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const VisitorsRecording: FC<Props> = ({ site, visitor, page, sort, columns, selected, setSelected, setPage, setSort }) => {
  const { items, pagination } = visitor.recordings;

  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => t.id))
      : setSelected([]);
  };

  return (
    <>
      {items.length > 0 && (
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
            <Cell>Browser</Cell>
            <Cell>NPS</Cell>
            <Cell>Sentiment</Cell>
            <Cell />
          </Row>
          {items.map(recording => (
            <RecordingsItem 
              site={site}
              recording={recording} 
              key={recording.id} 
              style={rowStyle}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Table>
      )}

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Illustration illustration='illustration-1' height={160} width={210} />
          <h4>There are currently no recordings for this visitor.</h4>
        </div>
      )}

      <Pagination 
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
