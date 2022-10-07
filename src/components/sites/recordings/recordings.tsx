import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { NoResults } from 'components/sites/no-results';
import { PageLoading } from 'components/sites/page-loading';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { useRecordings } from 'hooks/use-recordings';
import { RecordingsSmall } from 'components/sites/recordings/recordings-small';
import { RecordingsLarge } from 'components/sites/recordings/recordings-large';
import { getDateRange } from 'lib/dates';
import { useResize } from 'hooks/use-resize';
import { RecordingsSort } from 'types/graphql';
import type { TimePeriod, Column } from 'types/common';
import type { Site, Team, RecordingsFilters } from 'types/graphql';

interface Props {
  site: Site;
  filters: RecordingsFilters;
  period: TimePeriod;
  columns: Column[];
  member?: Team;
  page: number;
  size: number;
  sort: RecordingsSort;
  selected: string[];
  setSize: (size: number) => void;
  setPage: (page: number) => void;
  setSort: (sort: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const Recordings: FC<Props> = ({ 
  site, 
  filters, 
  period,
  columns, 
  member,
  size,
  page,
  sort,
  selected, 
  setSize,
  setPage,
  setSort,
  setSelected 
}) => {
  const { loading, error, recordings } = useRecordings({ 
    page, 
    sort,
    size,
    filters,
    range: getDateRange(period),
  });

  const { mobile } = useResize();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  if (!recordings.items.length) {
    return <NoResults illustration='illustration-13' title='There are no recordings matching your selected filters.' />;
  }

  const RecordingsComponent = mobile ? RecordingsSmall : RecordingsLarge;

  return (
    <>
      <RecordingsComponent
        site={site}
        recordings={recordings} 
        columns={columns}
        member={member}
        selected={selected}
        setSelected={setSelected}
        setSort={setSort}
        sort={sort}
      />

      <div className='recordings-footer'>
        <Pagination 
          currentPage={page}
          pageSize={recordings.pagination.pageSize}
          total={recordings.pagination.total}
          setPage={setPage}
        />
        <PageSize
          value={recordings.pagination.pageSize} 
          onChange={setSize}
          show={recordings.pagination.total > 25}
        />
      </div>
    </>
  );
};
