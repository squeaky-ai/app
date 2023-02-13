import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { PageSize } from 'components/sites/page-size';
import { VisitorsSmall } from 'components/sites/visitors/visitors-small';
import { VisitorsLarge } from 'components/sites/visitors/visitors-large';
import { EmptyState } from 'components/sites/empty-state';
import { VisitorsColumns } from 'components/sites/visitors/visitors-columns';
import { Filters } from 'components/sites/filters/visitors/filters';
import { Unlock } from 'components/sites/unlock';
import { Tags } from 'components/sites/filters/visitors/tags';
import { Period } from 'components/sites/period/period';
import { Search } from 'components/search';
import { PageLoading } from 'components/sites/page-loading';
import { DismissableMessage } from 'components/message';
import { Error } from 'components/error';
import { Preference } from 'lib/preferences';
import { NoResults } from 'components/sites/no-results';
import { useResize } from 'hooks/use-resize';
import { getDateRange } from 'lib/dates';
import { FILTERS } from 'data/visitors/constants';
import { useFilters } from 'hooks/use-filters';
import { useSort } from 'hooks/use-sort';
import { useColumns } from 'hooks/use-columns';
import { usePeriod } from 'hooks/use-period';
import type { Site, Team, VisitorsSort } from 'types/graphql';
import type { VisitorsFilters } from 'types/visitors';
import type { ValueOf } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
}

export const Visitors: FC<Props> = ({ site, member }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);
  const [search, setSearch] = React.useState<string>('');

  const { period, setPeriod } = usePeriod('visitors');

  const { sort, setSort } = useSort<VisitorsSort>('visitors');
  const { filters, setFilters } = useFilters<VisitorsFilters>('visitors');
  const { columns, columnsReady, setColumns } = useColumns('visitors');

  const { loading, error, visitors } = useVisitors({ 
    site,
    page, 
    sort,
    size,
    search,
    filters,
    range: getDateRange(period),
  });

  const { mobile } = useResize();

  const updateFilters = (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => {
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

  const handleSort = (sort: VisitorsSort) => {
    setPage(1);
    setSort(sort);
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />
  }

  const VisitorsComponent = mobile ? VisitorsSmall : VisitorsLarge;

  return (
    <>
      <div className='visitors-header'>
        <h4 className='title'>
          Visitors
          {site.recordingsCount > 0 && (
            <span>{visitors.pagination.total}</span>
          )}
        </h4>
        <menu>
          {site.recordingsCount > 0 && (
            <>
              <Search
                search={search}
                onSearch={setSearch}
                placeholder='Search ID&apos;s and linked data...'
              />
              <Period period={period} onChange={setPeriod} />
              <div className='menu-item columns'>
                <VisitorsColumns 
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
        title='There are currently no visitor records'
        illustration='illustration-6'
      />

      <Unlock site={site} />

      <DismissableMessage
        preference={Preference.VISITORS_LINKED_DATA_HIDE}
        type='info'
        className='linked-data'
        heading={<p><Icon name='link-m' /> Linked Data</p>}
        message={<p>The columns using the <Icon name='link-m' /> link icon are used to display linked user data from your website or web app. To discover how you can link Squeaky visitor records directly with data of logged in users, <a href='/developers' target='_blank'>click here</a>.</p>}
      />

      {!visitors.items.length && (
        <NoResults illustration='illustration-13' title='There are no visitors matching your selected filters.' />
      )}

      {site.recordingsCount > 0 && columnsReady && (
        <>
          <Tags 
            filters={filters} 
            updateFilters={updateFilters} 
            clearFilters={clearFilters} 
          />

          <VisitorsComponent
            site={site}
            member={member}
            visitors={visitors}
            sort={sort}
            columns={columns}
            search={search}
            setSort={handleSort}
          />
          
          <div className='visitors-footer'>
            <Pagination 
              currentPage={page} 
              pageSize={visitors.pagination.pageSize}
              total={visitors.pagination.total}
              setPage={setPage}
            />
            <PageSize 
              value={visitors.pagination.pageSize} 
              onChange={handlePageSize}
              show={visitors.pagination.total > 25}
            />
          </div>
        </>
      )}
    </>
  );
};
