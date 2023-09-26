import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { EmptyState } from 'components/sites/empty-state';
import { NoResults } from 'components/sites/no-results';
import { PageLoading } from 'components/sites/page-loading';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { Filters } from 'components/sites/filters/recordings/filters';
import { Tags } from 'components/sites/filters/recordings/tags';
import { Period } from 'components/sites/period/period';
import { Unlock } from 'components/sites/unlock';
import { RecordingsColumns } from 'components/sites/recordings/recordings-columns';
import { RecordingsBulkActions } from 'components/sites/recordings/recordings-bulk-actions';
import { useRecordings } from 'hooks/use-recordings';
import { RecordingsSmall } from 'components/sites/recordings/recordings-small';
import { RecordingsLarge } from 'components/sites/recordings/recordings-large';
import { getDateRange } from 'lib/dates';
import { useResize } from 'hooks/use-resize';
import { FILTERS } from 'data/recordings/constants';
import { useFilters } from 'hooks/use-filters';
import { usePeriod } from 'hooks/use-period';
import { RecordingsSort } from 'types/graphql';
import { useSort } from 'hooks/use-sort';
import { usePage } from 'hooks/use-page';
import { useColumns } from 'hooks/use-columns';
import { useSize } from 'hooks/use-size';
import type { Site, Team, RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
}

export const Recordings: FC<Props> = ({ 
  site, 
  member,
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const { page, setPage } = usePage('recordings');
  const { size, setSize } = useSize('recordings');
  const { period, setPeriod } = usePeriod('recordings');
  const { sort, setSort } = useSort<RecordingsSort>('recordings');
  const { filters, setFilters } = useFilters<RecordingsFilters>('recordings');
  const { columns, columnsReady, setColumns } = useColumns('recordings');

  const { loading, error, recordings } = useRecordings({
    site,
    page, 
    sort,
    size,
    filters,
    range: getDateRange(period),
  });

  const { mobile } = useResize();

  const updateFilters = (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => {
    setPage(1);
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(FILTERS);
  };

  const handlePageSize = (size: number) => {
    setPage(1);
    setSize(size);
  };

  const handleSort = (sort: RecordingsSort) => {
    setPage(1);
    setSort(sort);
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  const RecordingsComponent = mobile ? RecordingsSmall : RecordingsLarge;

  return (
    <>
      <div className='recordings-header'>
        <h4 className='title'>
          Recordings
          {site.recordingsCount > 0 && (
            <span>{recordings.pagination.total.toLocaleString()}</span>
          )}
        </h4>
        <menu>
          {site.recordingsCount > 0 && (
            <>
              <Period period={period} onChange={setPeriod} />
              <RecordingsBulkActions
                site={site}
                member={member}
                selected={selected}
                setSelected={setSelected}
              />
              <div className='menu-item columns'>
                <RecordingsColumns 
                  columns={columns}
                  setColumns={setColumns}
                />
              </div>
              <Filters 
                period={period}
                filters={filters}
                updateFilters={updateFilters}
              />
            </>
          )}
        </menu>
      </div>

      <EmptyState
        site={site}
        title='There are currently no recordings available'
        illustration='illustration-2'
      />

      <Unlock site={site} />

      <Tags 
        filters={filters} 
        updateFilters={updateFilters} 
        clearFilters={clearFilters} 
      />

      {recordings.items.length === 0 && site.recordingsCount !== 0 && (
        <NoResults illustration='illustration-13' title='There are no recordings matching your selected filters.' />
      )}

      {columnsReady && recordings.items.length > 0 && (
        <>
          <RecordingsComponent
            site={site}
            recordings={recordings} 
            columns={columns}
            member={member}
            selected={selected}
            setSelected={setSelected}
            setSort={handleSort}
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
              onChange={handlePageSize}
              show={recordings.pagination.total > 25}
            />
          </div>
        </>
      )}
    </>
  );
};
