import React from 'react';
import type { FC } from 'react';
import { Pagination } from 'components/pagination';
import { Sort } from 'components/sort';
import { VisitorRecordingsItem } from 'components/sites/visitor-recordings-item';
import type { Visitor } from 'types/visitor';
import type { RecordingSortBy } from 'types/recording';

interface Props {
  visitor: Visitor;
  sort: RecordingSortBy;
  page: number;
  setPage: (value: number) => void;
  setSort: (value: RecordingSortBy) => void;
}

export const VisitorRecording: FC<Props> = ({ visitor, page, sort, setPage, setSort }) => {
  const { items, pagination } = visitor.recordings;

  return (
    <>
      <h4 className='sub-heading'>Recordings</h4>

      <div className='table visitor-recordings-table'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Status</th>
              <th>Recording ID</th>
              <th>Date &amp; Time<Sort name='date' order={sort} onAsc={() => setSort('DATE_ASC')} onDesc={() => setSort('DATE_DESC')} /></th>
              <th>Duration<Sort name='duration' order={sort} onAsc={() => setSort('DURATION_ASC')} onDesc={() => setSort('DURATION_DESC')} /></th>
              <th>Pages<Sort name='page_size' order={sort} onAsc={() => setSort('PAGE_SIZE_ASC')} onDesc={() => setSort('PAGE_SIZE_DESC')} /></th>
              <th>Start &amp; Exit URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(recording => (
              <VisitorRecordingsItem key={recording.id} recording={recording} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
