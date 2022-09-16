import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Pagination } from 'components/pagination';
import { useVisitors } from 'hooks/use-visitors';
import { PageSize } from 'components/sites/page-size';
import { VisitorsSmall } from 'components/sites/visitors/visitors-small';
import { VisitorsLarge } from 'components/sites/visitors/visitors-large';
import { PageLoading } from 'components/sites/page-loading';
import { DismissableMessage } from 'components/message';
import { Error } from 'components/error';
import { Preference } from 'lib/preferences';
import { NoResults } from 'components/sites/no-results';
import { useResize } from 'hooks/use-resize';
import { Team, VisitorsSort } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { Column } from 'types/common';
import type { VisitorsFilters } from 'types/visitors';

interface Props {
  site: Site;
  member: Team;
  search: string;
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
  search,
  member,
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
    search,
    filters,
  });

  const { mobile } = useResize();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />
  }

  const VisitorsComponent = mobile ? VisitorsSmall : VisitorsLarge;

  return (
    <>
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

      <VisitorsComponent
        site={site}
        member={member}
        visitors={visitors}
        sort={sort}
        columns={columns}
        search={search}
        setSort={setSort}
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
          onChange={setSize}
          show={visitors.pagination.total > 25}
        />
      </div>
    </>
  );
};
