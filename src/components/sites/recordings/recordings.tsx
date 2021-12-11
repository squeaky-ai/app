import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { RecordingsItem } from 'components/sites/recordings/recordings-item';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import { Error } from 'components/error';
import { EmptyState } from 'components/sites/filters/common/empty-state';
import { useRecordings } from 'hooks/use-recordings';
import { COLUMNS } from 'data/recordings/constants';
import { getColumnStyles } from 'lib/tables';
import { RecordingsSort } from 'types/graphql';
import type { Column } from 'types/common';
import type { Site, RecordingsFilters } from 'types/graphql';

interface Props {
  site: Site;
  filters: RecordingsFilters;
  columns: Column[];
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const Recordings: FC<Props> = ({ site, filters, columns, selected, setSelected }) => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<RecordingsSort>(RecordingsSort.ConnectedAtDesc);

  const { loading, error, recordings } = useRecordings({ 
    page, 
    sort,
    size,
    filters,
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
          <Cell>Date &amp; Time<Sort name='connected_at' order={sort} onAsc={() => setSort(RecordingsSort.ConnectedAtAsc)} onDesc={() => setSort(RecordingsSort.ConnectedAtDesc)} /></Cell>
          <Cell>Duration <Sort name='duration' order={sort} onAsc={() => setSort(RecordingsSort.DurationAsc)} onDesc={() => setSort(RecordingsSort.DurationDesc)} /></Cell>
          <Cell>Pages <Sort name='page_count' order={sort} onAsc={() => setSort(RecordingsSort.PageCountAsc)} onDesc={() => setSort(RecordingsSort.PageCountDesc)} /></Cell>
          <Cell>Start &amp; Exit URL</Cell>
          <Cell>Device &amp; Viewport (px)</Cell>
          <Cell>Browser</Cell>
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

      {loading && !items.length && (
        <Row className='loading'>
          <Spinner />
        </Row>
      )}

      {!loading && items.length === 0 && (
        <EmptyState type='recordings' />
      )}
      
      <div className='recordings-footer'>
        <Pagination 
          currentPage={page + 1} 
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
