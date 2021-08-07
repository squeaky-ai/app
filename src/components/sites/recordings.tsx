import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { RecordingsItem } from 'components/sites/recordings-item';
import { Sort } from 'components/sort';
import { useRecordings } from 'hooks/recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import type { RecordingSortBy } from 'types/recording';

interface Props {
  query: string;
}

export const Recordings: FC<Props> = ({ query }) => {
  const [page, setPage] = React.useState<number>(1);
  const [sort, setSort] = React.useState<RecordingSortBy>('DATE_DESC');

  const [loading, recordings] = useRecordings({ 
    page, 
    sort,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
  });

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
    
      <div className='table recordings-list'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Status</th>
              <th>Recording ID</th>
              <th>User ID</th>
              <th>Date &amp; Time<Sort name='date' order={sort} onAsc={() => setSort('DATE_ASC')} onDesc={() => setSort('DATE_DESC')} /></th>
              <th>Duration <Sort name='duration' order={sort} onAsc={() => setSort('DURATION_ASC')} onDesc={() => setSort('DURATION_DESC')} /></th>
              <th>Pages <Sort name='page_size' order={sort} onAsc={() => setSort('PAGE_SIZE_ASC')} onDesc={() => setSort('PAGE_SIZE_DESC')} /></th>
              <th>Start &amp; Exit URL</th>
              <th>Device &amp; Viewport (px)</th>
              <th>Browser</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recordings.items.map(recording => (
              <RecordingsItem 
                recording={recording} 
                query={query} 
                key={recording.id} 
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={page} 
        pageSize={recordings.pagination.pageSize}
        total={recordings.pagination.total}
        setPage={setPage}
      />
    </>
  );
};
