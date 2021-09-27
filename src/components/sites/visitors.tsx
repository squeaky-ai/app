import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Container } from 'components/container';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Tooltip } from 'components/tooltip';
import { VisitorsItem } from 'components/sites/visitors-item';
import { Table, Row, Cell } from 'components/table';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import { BASE_PATH } from 'data/common/constants';
import type { Site } from 'types/site';
import type { VisitorSortBy } from 'types/visitor';

interface Props {
  query: string;
  site: Site;
}

export const Visitors: FC<Props> = ({ site, query }) => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<VisitorSortBy>('first_viewed_at__desc');

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
            <Image src={`${BASE_PATH}/empty-state-4.svg`} height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h4 className='sub-heading'>There are no visitors matching your search.</h4>
          </div>
        </Container>
      )}

      <Table className='visitors-list hover'>
        <Row head>
          <Cell>
            Status
          </Cell>
          <Cell>
            Visitor ID
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<i className='ri-link-m' />}>
              Linked Data
            </Tooltip>
            User ID
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<i className='ri-link-m' />}>
              Linked Data
            </Tooltip>
            Name
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<i className='ri-link-m' />}>
              Linked Data
            </Tooltip>
            Email
          </Cell>
          <Cell>
            Recordings
            <Sort 
              name='recordings_count' 
              order={sort} 
              onAsc={() => setSort('recordings_count__asc')} 
              onDesc={() => setSort('recordings_count__desc')} 
            />
          </Cell>
          <Cell>
            First visited
            <Sort 
              name='first_viewed_at' 
              order={sort} 
              onAsc={() => setSort('first_viewed_at__asc')} 
              onDesc={() => setSort('first_viewed_at__desc')} 
            />
          </Cell>
          <Cell>
            Last activity
            <Sort 
              name='last_activity_at' 
              order={sort} 
              onAsc={() => setSort('last_activity_at__asc')} 
              onDesc={() => setSort('last_activity_at__desc')} 
            />
          </Cell>
          <Cell>
            Language
          </Cell>
          <Cell>
            Device &amp; viewport
          </Cell>
          <Cell>
            Browser
          </Cell>
        </Row>
        {items.map(v => (
          <VisitorsItem 
            site={site} 
            visitor={v} 
            key={v.visitorId} 
            query={query} 
          />
        ))}
      </Table>
      
      <div className='visitors-footer'>
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
