import React from 'react';
import type { FC } from 'react';
import { Pagination } from 'components/pagination';
import { VisitorRecordingsItem } from 'components/sites/visitor-recordings-item';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
  page: number;
  setPage: (value: number) => void;
}

export const VisitorRecording: FC<Props> = ({ visitor, page, setPage }) => {
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
                <th>Date &amp; Time</th>
                <th>Duration</th>
                <th>Pages</th>
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
