import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Container } from 'components/container';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { VisitorsItem } from 'components/sites/visitors-item';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import type { Site } from 'types/site';
import type { VisitorSortBy } from 'types/visitor';

interface Props {
  query: string;
  site: Site;
}

export const Visitors: FC<Props> = ({ query }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<VisitorSortBy>('FIRST_VIEWED_AT_DESC');

  const { loading, visitors } = useVisitors({ 
    page, 
    sort,
    size,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
  });

  const { items, pagination } = visitors;

  return (
    <>
      {!loading && (
        <Container className='xl centered empty-state'>
          <div className='empty-state-contents'>
            <Image src='/empty-state-4.svg' height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h4 className='sub-heading'>There are no visitors matching your search.</h4>
          </div>
        </Container>
      )}

      <div className='table visitors-list'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Visitor ID</th>
              <th>Recordings<Sort name='recordings_count' order={sort} onAsc={() => setSort('RECORDINGS_COUNT_ASC')} onDesc={() => setSort('RECORDINGS_COUNT_DESC')} /></th>
              <th>First visited<Sort name='first_viewed_at' order={sort} onAsc={() => setSort('FIRST_VIEWED_AT_ASC')} onDesc={() => setSort('FIRST_VIEWED_AT_DESC')} /></th>
              <th>Last activity<Sort name='last_activity_at' order={sort} onAsc={() => setSort('LAST_ACTIVITY_AT_ASC')} onDesc={() => setSort('LAST_ACTIVITY_AT_DESC')} /></th>
              <th>Language</th>
              <th>Device &amp; viewport</th>
              <th>Browser</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(v => (
              <VisitorsItem visitor={v} key={v.visitorId} query={query} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className='visitors-footer'>
        <Pagination 
          currentPage={page} 
          pageSize={pagination.pageSize}
          total={pagination.total}
          setPage={setPage}
        />
        <PageSize 
          value={pagination.pageSize} 
          onChange={setSize}
          show={items.length > 0}
        />
      </div>
    </>
  );
};
