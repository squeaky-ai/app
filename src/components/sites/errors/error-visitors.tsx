import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { useSort } from 'hooks/use-sort';
import { getDateRange } from 'lib/dates';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { Illustration } from 'components/illustration';
import { VisitorsSmall } from 'components/sites/visitors/visitors-small';
import { VisitorsLarge } from 'components/sites/visitors/visitors-large';
import { useResize } from 'hooks/use-resize';
import { useErrorsDetailsVisitors } from 'hooks/use-errors-details-visitors';
import type { VisitorsSort, Site, Team } from 'types/graphql';
import type { Column, TimePeriod } from 'types/common';

interface Props {
  id: string;
  site: Site;
  member: Team;
  period: TimePeriod;
  columns: Column[];
}

export const ErrorVisitors: FC<Props> = ({
  id,
  site,
  member,
  period,
  columns,
}) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { mobile } = useResize();
  const { sort, setSort } = useSort<VisitorsSort>('visitors');

  const { visitors, loading, error } = useErrorsDetailsVisitors({
    id,
    page,
    size,
    sort,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  const VisitorsComponent = mobile ? VisitorsSmall : VisitorsLarge;

  return (
    <div className='error-visitors'>
      {visitors.items.length === 0 && (
        <div className='no-error-recordings'>
          <Illustration illustration='illustration-1' height={160} width={210} />
          <h4>There are no visitors for this error.</h4>
        </div>
      )}

      {visitors.items.length > 0 && (
        <>
          <VisitorsComponent
            site={site}
            visitors={visitors}
            setSort={setSort}
            sort={sort}
            member={member}
            columns={columns}
            search={''}
          />
          <div className='errors-table-footer'>
            <Pagination
              currentPage={page}
              pageSize={visitors.pagination.pageSize}
              total={visitors.pagination.total}
              setPage={setPage}
            />
            <PageSize
              value={visitors.pagination.pageSize} 
              onChange={setSize}
              show={visitors.pagination.total > 10}
            />
          </div>
        </>
      )}
    </div>
  );
};
