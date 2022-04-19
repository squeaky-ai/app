import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Tooltip } from 'components/tooltip';
import { VisitorsItem } from 'components/sites/visitors/visitors-item';
import { TableWrapper, Table, Row, Cell, RowSkeleton } from 'components/table';
import { DismissableMessage } from 'components/message';
import { Error } from 'components/error';
import { Preference } from 'lib/preferences';
import { NoResults } from 'components/sites/no-results';
import { COLUMNS } from 'data/visitors/constants';
import { getColumnStyles } from 'lib/tables';
import { formatFilterDates } from 'lib/visitors';
import { VisitorsSort } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { Column } from 'types/common';
import type { VisitorsFilters } from 'types/graphql';

interface Props {
  site: Site;
  columns: Column[];
  page: number;
  size: number;
  sort: VisitorsSort;
  filters: VisitorsFilters;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSort: (sort: VisitorsSort) => void;
}

export const Visitors: FC<Props> = ({ 
  site,
  columns, 
  filters,
  page,
  size,
  sort,
  setPage,
  setSize,
  setSort,
}) => {
  const { loading, error, visitors } = useVisitors({ 
    page, 
    sort,
    size,
    filters: formatFilterDates(filters),
  });

  const { items, pagination } = visitors;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  if (error) {
    return <Error />;
  }

  return (
    <>
      {!loading && !visitors.items.length && (
        <NoResults illustration='illustration-13' title='There are no visitors matching your selected filters.' />
      )}

      <DismissableMessage
        preference={Preference.VISITORS_LINKED_DATA_HIDE}
        type='info'
        className='linked-data'
        heading={<p><Icon name='link-m' /> Linked Data</p>}
        message={<p>The columns using the <Icon name='link-m' /> link icon are used to display linked user data from your website or web app. To discover how you can link Squeaky visitor records directly with data of logged in users, <a href='/developers' target='_blank'>click here</a>.</p>}
      />

      <TableWrapper>
        <Table className={classnames('visitors-list hover', tableClassNames, { hide:  !loading && items.length === 0 })}>
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
            <Cell>
              Country
            </Cell>
            <Cell />
          </Row>
          {loading && (
            <RowSkeleton count={25} />
          )}

          {!loading && items.map(v => (
            <VisitorsItem 
              site={site} 
              visitor={v} 
              key={v.visitorId} 
              style={rowStyle}
            />
          ))}
        </Table>
      </TableWrapper>
      
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
