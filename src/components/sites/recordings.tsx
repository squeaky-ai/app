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
import { useRecordings } from 'hooks/use-recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import { BASE_PATH } from 'data/common/constants';
import type { Filters, RecordingSortBy } from 'types/recording';

interface Props {
  query: string;
  filters: Filters;
  columns: string[];
}

const tableClassNames = (columns: string[]) => {
  const classNames = [];

  if (!columns.includes('Date & Time')) classNames.push('hide-date-time');
  if (!columns.includes('Duration')) classNames.push('hide-duration');
  if (!columns.includes('Pages')) classNames.push('hide-pages');
  if (!columns.includes('Start & Exit URL')) classNames.push('hide-start-exit');
  if (!columns.includes('Device & Viewport')) classNames.push('hide-device');
  if (!columns.includes('Browser')) classNames.push('hide-browser');

  return classNames;
};

export const Recordings: FC<Props> = ({ query, filters, columns }) => {
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
    
      <Table className={classnames('recordings-list hover', tableClassNames(columns))}>
        <Row head>
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
          />
        ))}
      </Table>
      
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
