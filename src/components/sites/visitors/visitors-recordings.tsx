import React from 'react';
import type { FC } from 'react';
import { Pagination } from 'components/pagination';
import { Illustration } from 'components/illustration';
import { VisitorsRecordingsSmall } from 'components/sites/visitors/visitors-recordings-small';
import { VisitorsRecordingsLarge } from 'components/sites/visitors/visitors-recordings-large';
import { useResize } from 'hooks/use-resize';
import { RecordingsSort } from 'types/graphql';
import type { Visitor, Site, Team } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  visitor: Visitor;
  sort: RecordingsSort;
  page: number;
  site: Site;
  columns: Column[];
  selected: string[];
  member?: Team;
  setPage: (value: number) => void;
  setSort: (value: RecordingsSort) => void;
  setSelected: (selected: string[]) => void;
}

export const VisitorsRecording: FC<Props> = ({ site, visitor, page, sort, columns, selected, member, setSelected, setPage, setSort }) => {
  const { mobile } = useResize();

  const { items, pagination } = visitor.recordings;

  const Component = mobile ? VisitorsRecordingsSmall : VisitorsRecordingsLarge;

  return (
    <>
      {items.length > 0 && (
        <Component
          columns={columns}
          member={member}
          selected={selected}
          setSelected={setSelected}
          setSort={setSort}
          site={site}
          sort={sort}
          visitor={visitor}
        />
      )}

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Illustration illustration='illustration-1' height={160} width={210} />
          <h4>There are currently no recordings for this visitor.</h4>
        </div>
      )}

      <Pagination 
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
