import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { RecordingsItem } from 'components/sites/recordings-item';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import { useRecordings } from 'hooks/use-recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import { BASE_PATH } from 'data/common/constants';
import { allColumns } from 'lib/recordings';
import type { Filters, RecordingSortBy, Column } from 'types/recording';

interface Props {
  query: string;
  filters: Filters;
  columns: Column[];
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const Recordings: FC<Props> = ({ query, filters, columns, selected, setSelected }) => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<RecordingSortBy>('connected_at__desc');

  const { loading, recordings } = useRecordings({ 
    page, 
    sort,
    size,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
    filters,
  });

  const { items, pagination } = recordings;

  const rowStyle: React.CSSProperties = { 
    gridTemplateColumns: allColumns
      .map(column => columns.find(c => c.name === column.name)?.width || '')
      .join(' ')
  };

  const tableClassNames = allColumns
    .map(column => columns.find(c => c.name === column.name) ? '' : `hide-${column.name}`);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(items.map(t => t.id))
      : setSelected([]);
  };

  return (
    <>
      {!loading && (
        <Container className='xl centered empty-state'>
          <div className='empty-state-contents'>
            <Image src={`${BASE_PATH}/empty-state-4.svg`} height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h4 className='sub-heading'>There are no recordings matching your search.</h4>
          </div>
        </Container>
      )}
    
      <Table className={classnames('recordings-list hover', tableClassNames)}>
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
          <Cell>User ID</Cell>
          <Cell>Date &amp; Time<Sort name='connected_at' order={sort} onAsc={() => setSort('connected_at__asc')} onDesc={() => setSort('connected_at__desc')} /></Cell>
          <Cell>Duration <Sort name='duration' order={sort} onAsc={() => setSort('duration__asc')} onDesc={() => setSort('duration__desc')} /></Cell>
          <Cell>Pages <Sort name='page_count' order={sort} onAsc={() => setSort('page_count__asc')} onDesc={() => setSort('page_count__desc')} /></Cell>
          <Cell>Start &amp; Exit URL</Cell>
          <Cell>Device &amp; Viewport (px)</Cell>
          <Cell>Browser</Cell>
          <Cell />
        </Row>
        
        {items.map(recording => (
          <RecordingsItem 
            recording={recording} 
            query={query} 
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
