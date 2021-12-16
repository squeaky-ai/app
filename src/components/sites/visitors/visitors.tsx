import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Tooltip } from 'components/tooltip';
import { Spinner } from 'components/spinner';
import { VisitorsItem } from 'components/sites/visitors/visitors-item';
import { Table, Row, Cell } from 'components/table';
import { DismissableMessage } from 'components/message';
import { Error } from 'components/error';
import { EmptyState } from 'components/sites/filters/common/empty-state';
import { Preference } from 'lib/preferences';
import { COLUMNS } from 'data/visitors/constants';
import { getColumnStyles } from 'lib/tables';
import { VisitorsSort } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { Column } from 'types/common';
import type { VisitorsFilters } from 'types/graphql';

interface Props {
  site: Site;
  columns: Column[];
  filters: VisitorsFilters;
}

export const Visitors: FC<Props> = ({ site, columns, filters }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [sort, setSort] = React.useState<VisitorsSort>(VisitorsSort.FirstViewedAtDesc);

  const { loading, error, visitors } = useVisitors({ 
    page, 
    sort,
    size,
    filters,
  });

  const { items, pagination } = visitors;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  if (error) {
    return <Error />;
  }

  return (
    <>
      {!loading && (
        <Container className='xl centered empty-state'>
          <div className='empty-state-contents'>
            <Illustration src='illustration-4' height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h5>There are no visitors matching your search.</h5>
          </div>
        </Container>
      )}

      <DismissableMessage
        preference={Preference.VISITORS_LINKED_DATA_HIDE}
        type='info'
        heading={<p><Icon name='link-m' /> Linked Data</p>}
        message={<p>The columns using the <Icon name='link-m' /> link icon are used to display linked user data from your website or web app. To discover how you can link Squeaky visitor records directly with data of logged in users, <Link href='/developers'><a target='_blank'>click here</a></Link>.</p>}
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
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            User ID
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            Name
          </Cell>
          <Cell className='linked'>
            <Tooltip button={<Icon name='link-m' />}>
              Linked Data
            </Tooltip>
            Email
          </Cell>
          <Cell>
            Recordings
            <Sort 
              name='recordings' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.RecordingsAsc)} 
              onDesc={() => setSort(VisitorsSort.RecordingsDesc)} 
            />
          </Cell>
          <Cell>
            First visited
            <Sort 
              name='first_viewed_at' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.FirstViewedAtAsc)} 
              onDesc={() => setSort(VisitorsSort.FirstViewedAtDesc)} 
            />
          </Cell>
          <Cell>
            Last activity
            <Sort 
              name='last_activity_at' 
              order={sort} 
              onAsc={() => setSort(VisitorsSort.LastActivityAtAsc)} 
              onDesc={() => setSort(VisitorsSort.LastActivityAtDesc)} 
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
        <EmptyState type='visitors' />
      )}
      
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
          show={pagination.total > 25}
        />
      </div>
    </>
  );
};
