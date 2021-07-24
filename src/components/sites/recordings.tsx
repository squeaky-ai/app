import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Main } from 'components/main';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { RecordingsItem } from 'components/sites/recordings-item';
import { Sort } from 'components/sort';
import { useRecordings } from 'hooks/recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import type { SortBy } from 'types/recording';

export const Recordings: FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [query, setQuery] = React.useState<string>('');
  const [sort, setSort] = React.useState<SortBy>('DATE_DESC');

  const [loading, recordings] = useRecordings({ 
    page, 
    sort,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
  });

  const hasRecordings = recordings.items.length > 0;

  const handleSearch = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setQuery(element.value);
  }, 200);

  const handleCancel = () => {
    setQuery('');

    const search = document.querySelector<HTMLInputElement>('#search');
    search.value = '';
    search.focus();
  };

  return (
    <Main className={classnames('recordings', { empty: !hasRecordings })}>
      <h3 className='title'>
        Recordings
        <div className='search' role='search' aria-label='Filter recordings'>
          <Input type='search' placeholder='Search...' onKeyUp={handleSearch} id='search' />
          {query && (
            <Button onClick={handleCancel}>
              <i className='ri-close-line' />
            </Button>
          )}
          <i className='ri-search-line' /> 
        </div>
      </h3>

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
              <th>Language</th>
              <th>Pages <Sort name='page_size' order={sort} onAsc={() => setSort('PAGE_SIZE_ASC')} onDesc={() => setSort('PAGE_SIZE_DESC')} /></th>
              <th>Start &amp; Exit URL</th>
              <th>Browser</th>
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
    </Main>
  );
};
