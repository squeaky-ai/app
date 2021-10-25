import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Container } from 'components/container';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Tooltip } from 'components/tooltip';
import { Spinner } from 'components/spinner';
import { VisitorsItem } from 'components/sites/visitors-item';
import { Table, Row, Cell } from 'components/table';
import { DismissableMessage } from 'components/message';
import { Error } from 'components/error';
import { EmptyState } from 'components/sites/filters/common/empty-state';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';
import { BASE_PATH } from 'data/common/constants';
import { Preference } from 'lib/preferences';
import { allColumns } from 'lib/visitors';
import type { Site } from 'types/site';
import type { Column, Filters, VisitorSortBy } from 'types/visitor';

interface Props {
  query: string;
  site: Site;
  columns: Column[];
  filters: Filters;
}

export const Visitors: FC<Props> = ({ site, query, columns, filters }) => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<VisitorSortBy>('first_viewed_at__desc');

  const { loading, error, visitors } = useVisitors({ 
    page, 
    sort,
    size,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
    filters,
  });

  const { items, pagination } = visitors;

  const rowStyle: React.CSSProperties = { 
    gridTemplateColumns: allColumns
      .map(column => columns.find(c => c.name === column.name)?.width || '')
      .join(' ')
  };

  const tableClassNames = allColumns
    .map(column => columns.find(c => c.name === column.name) ? '' : `hide-${column.name}`);

  if (error) {
    return <Error />;
  }

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

      <DismissableMessage
        preference={Preference.VISITORS_LINKED_DATA_HIDE}
        type='info'
        heading={<p><i className='ri-link-m' /> Linked Data</p>}
        message={<p>The columns using the <i className='ri-link-m' /> link icon are used to display linked user data from your website or web app. To discover how you can link Squeaky visitor records directly with data of logged in users, <Link href='/developers'><a target='_blank'>click here</a></Link>.</p>}
      />

      <Table className={classnames('visitors-list hover', tableClassNames, { hide: items.length === 0 })}>
        <Row head style={rowStyle}>
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
            style={rowStyle}
          />
        ))}
      </Table>

      {loading && !items.length && (
        <Row className='loading'>
          <Spinner />
        </Row>
      )}

      {!loading && items.length === 0 && (
        <EmptyState search={query.length > 0} type='visitors' />
      )}
      
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
