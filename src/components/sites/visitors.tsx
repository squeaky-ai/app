import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Container } from 'components/container';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { VisitorsItem } from 'components/sites/visitors-item';
import { Table, Row, Cell } from 'components/table';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import type { Site } from 'types/site';
import type { VisitorSortBy, ExternalAttributes } from 'types/visitor';

interface Props {
  query: string;
  site: Site;
}

export const Visitors: FC<Props> = ({ site, query }) => {
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

  const showLinkedData = (() => !!items.find(i => {
    if (!i.attributes) return false;

    const attributes = JSON.parse(i.attributes) as ExternalAttributes;
    return Object.keys(attributes).some(i => ['id', 'name', 'email'].includes(i));
  }))();

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

      <Table className={classnames('visitors-list', { 'show-linked-data': showLinkedData })}>
        <Row head>
          <Cell>
            Status
          </Cell>
          <Cell>
            Visitor ID
          </Cell>
          <Cell>
            <i className='ri-link-m' />
            User ID
          </Cell>
          <Cell>
            <i className='ri-link-m' />
            Name
          </Cell>
          <Cell>
            <i className='ri-link-m' />
            Email
          </Cell>
          <Cell>
            Recordings
            <Sort 
              name='recordings_count' 
              order={sort} 
              onAsc={() => setSort('RECORDINGS_COUNT_ASC')} 
              onDesc={() => setSort('RECORDINGS_COUNT_DESC')} 
            />
          </Cell>
          <Cell>
            First visited
            <Sort 
              name='first_viewed_at' 
              order={sort} 
              onAsc={() => setSort('FIRST_VIEWED_AT_ASC')} 
              onDesc={() => setSort('FIRST_VIEWED_AT_DESC')} 
            />
          </Cell>
          <Cell>
            Last activity
            <Sort 
              name='last_activity_at' 
              order={sort} 
              onAsc={() => setSort('LAST_ACTIVITY_AT_ASC')} 
              onDesc={() => setSort('LAST_ACTIVITY_AT_DESC')} 
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
