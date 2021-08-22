import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { RecordingsItem } from 'components/sites/recordings-item';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { useRecordings } from 'hooks/use-recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import type { RecordingSortBy } from 'types/recording';

interface Props {
  query: string;
}

export const Recordings: FC<Props> = ({ query }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<RecordingSortBy>('DATE_DESC');

  const { loading, recordings } = useRecordings({ 
    page, 
    sort,
    size,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
  });

  const { items, pagination } = recordings;

  return (
    <>
      {!loading && (
        <Container className='xl centered empty-state'>
          <div className='empty-state-contents'>
            <Image src='/empty-state-4.svg' height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h4 className='sub-heading'>There are no recordings matching your search.</h4>
          </div>
        </Container>
      )}
    
      <Table className='recordings-list'>
        <Row head>
          <Cell>Status</Cell>
          <Cell>Recording ID</Cell>
          <Cell>User ID</Cell>
          <Cell>Date &amp; Time<Sort name='date' order={sort} onAsc={() => setSort('DATE_ASC')} onDesc={() => setSort('DATE_DESC')} /></Cell>
          <Cell>Duration <Sort name='duration' order={sort} onAsc={() => setSort('DURATION_ASC')} onDesc={() => setSort('DURATION_DESC')} /></Cell>
          <Cell>Pages <Sort name='page_size' order={sort} onAsc={() => setSort('PAGE_SIZE_ASC')} onDesc={() => setSort('PAGE_SIZE_DESC')} /></Cell>
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
          currentPage={page} 
          pageSize={pagination.pageSize}
          total={pagination.total}
          setPage={setPage}
        />
        <PageSize 
          value={pagination.pageSize} 
          onChange={setSize}
          show={items.length > 25}
        />
      </div>
    </>
  );
};
