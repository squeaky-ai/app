import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { useSort } from 'hooks/use-sort';
import { getDateRange } from 'lib/dates';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { Illustration } from 'components/illustration';
import { useResize } from 'hooks/use-resize';
import { RecordingsSmall } from 'components/sites/recordings/recordings-small';
import { RecordingsLarge } from 'components/sites/recordings/recordings-large';
import { useErrorsDetailsRecordings } from 'hooks/use-errors-details-recordings';
import type { RecordingsSort, Site, Team } from 'types/graphql';
import type { Column, TimePeriod } from 'types/common';

interface Props {
  id: string;
  site: Site;
  member: Team;
  period: TimePeriod;
  selected: string[];
  columns: Column[];
  setSelected: (selected: string[]) => void;
}

export const ErrorRecordings: FC<Props> = ({
  id,
  site,
  member,
  period,
  selected, 
  columns,
  setSelected
}) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { mobile } = useResize();
  const { sort, setSort } = useSort<RecordingsSort>('recordings');

  const { recordings, loading, error } = useErrorsDetailsRecordings({
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

  const RecordingsComponent = mobile ? RecordingsSmall : RecordingsLarge;

  return (
    <div className='error-recordings'>
      {recordings.items.length === 0 && (
        <div className='no-error-recordings'>
          <Illustration illustration='illustration-1' height={160} width={210} />
          <h4>There are no sessions for this error.</h4>
        </div>
      )}

      {recordings.items.length > 0 && (
        <>
          <RecordingsComponent
            site={site}
            recordings={recordings}
            selected={selected}
            setSelected={setSelected}
            setSort={setSort}
            sort={sort}
            member={member}
            columns={columns}
          />
          <div className='errors-table-footer'>
            <Pagination
              currentPage={page}
              pageSize={recordings.pagination.pageSize}
              total={recordings.pagination.total}
              setPage={setPage}
            />
            <PageSize
              value={recordings.pagination.pageSize} 
              onChange={setSize}
              show={recordings.pagination.total > 10}
            />
          </div>
        </>
      )}
    </div>
  );
};
