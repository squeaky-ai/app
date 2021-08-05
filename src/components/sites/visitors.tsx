import React from 'react';
import type { FC } from 'react';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const Visitors: FC<Props> = () => {
  return (
    <>
      <div className='table recordings-list'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Visitor ID</th>
              <th>Recordings</th>
              <th>First visited</th>
              <th>Last activity</th>
              <th>Language</th>
              <th>Device &amp; viewport</th>
              <th>Browser</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </>
  );
};
