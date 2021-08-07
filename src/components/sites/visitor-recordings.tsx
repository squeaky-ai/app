import React from 'react';
import type { FC } from 'react';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
}

export const VisitorRecording: FC<Props> = () => {
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

            </tbody>
          </table>
      </div>
    </>
  );
};
