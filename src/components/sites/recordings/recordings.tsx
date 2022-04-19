import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { RecordingsItem } from 'components/sites/recordings/recordings-item';
import { TableWrapper, Table, Row, Cell, RowSkeleton } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Checkbox } from 'components/checkbox';
import { Error } from 'components/error';
import { NoResults } from 'components/sites/no-results';
import { useRecordings } from 'hooks/use-recordings';
import { COLUMNS } from 'data/recordings/constants';
import { getDateRange } from 'lib/dates';
import { getColumnStyles } from 'lib/tables';
import { RecordingsSort, } from 'types/graphql';
import type { TimePeriod, Column } from 'types/common';
import type { Site, Team, RecordingsFilters } from 'types/graphql';

interface Props {
  site: Site;
  filters: RecordingsFilters;
  period: TimePeriod;
  columns: Column[];
  member: Team;
  page: number;
  size: number;
  sort: RecordingsSort;
  selected: string[];
  setSize: (size: number) => void;
  setPage: (page: number) => void;
  setSort: (sort: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const Recordings: FC<Props> = ({ 
  site, 
  filters, 
  period, 
  columns, 
  member,
  size,
  page,
  sort,
  selected, 
  setSize,
  setPage,
  setSort,
  setSelected 
}) => {
  const { loading, error, recordings } = useRecordings({ 
    page, 
    sort,
    size,
    filters,
    range: getDateRange(period),
  });

  const { items, pagination } = recordings;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => t.id))
      : setSelected([]);
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      {!loading && !items.length && (
        <NoResults illustration='illustration-13' title='There are no recordings matching your selected filters.' />
      )}

      <TableWrapper>
        <Table className={classnames('recordings-list hover', tableClassNames, { hide: !loading && items.length === 0 })}>
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

          {loading && (
            <RowSkeleton className='recording-row' count={25} />
          )}
          
          {!loading && items.map(recording => (
            <RecordingsItem 
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
      
      <div className='recordings-footer'>
        <Pagination 
          currentPage={page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          setPage={setPage}
        />
        <PageSize
          value={pagination.pageSize} 
          onChange={setSize}
          show={pagination.total > 25}
        />
      </div>
    </>
  );
};
