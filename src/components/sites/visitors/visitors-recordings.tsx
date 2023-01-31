import React from 'react';
import type { FC } from 'react';
import { Pagination } from 'components/pagination';
import { Illustration } from 'components/illustration';
import { Spinner } from 'components/spinner';
import { VisitorsRecordingsSmall } from 'components/sites/visitors/visitors-recordings-small';
import { VisitorsRecordingsLarge } from 'components/sites/visitors/visitors-recordings-large';
import { RecordingsColumns } from 'components/sites/recordings/recordings-columns';
import { RecordingsBulkActions } from 'components/sites/recordings/recordings-bulk-actions';
import { Error } from 'components/error';
import { useResize } from 'hooks/use-resize';
import { useColumns } from 'hooks/use-columns';
import { RecordingsSort } from 'types/graphql';
import { useVisitorRecordings } from 'hooks/use-visitor-recordings';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
}

export const VisitorsRecording: FC<Props> = ({ site, member }) => {
  const { mobile } = useResize();

  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [sort, setSort] = React.useState<RecordingsSort>(RecordingsSort.ConnectedAtDesc);

  const { loading, error, recordings } = useVisitorRecordings({
    page,
    sort,
  });

  const { columns, columnsReady, setColumns } = useColumns('recordings');

  const { items, pagination } = recordings;

  const Component = mobile ? VisitorsRecordingsSmall : VisitorsRecordingsLarge;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className='recordings-header'>
        <h4>Recordings</h4>
        {items.length > 0 && columnsReady && (
          <menu>
            <RecordingsBulkActions
              site={site}
              member={member}
              selected={selected}
              setSelected={setSelected}
            />
            <RecordingsColumns 
              columns={columns}
              setColumns={setColumns}
            />
          </menu>
        )}
      </div>

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Illustration illustration='illustration-1' height={160} width={320} />
          <h5>There are currently no recordings for this visitor.</h5>
        </div>
      )}

      {items.length > 0 && columnsReady && (
        <>
          <Component
            columns={columns}
            member={member}
            selected={selected}
            setSelected={setSelected}
            setSort={setSort}
            site={site}
            sort={sort}
            recordings={recordings}
          />

          <Pagination 
            currentPage={page} 
            pageSize={pagination.pageSize}
            total={pagination.total}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
