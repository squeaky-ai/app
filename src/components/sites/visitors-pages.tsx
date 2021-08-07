import React from 'react';
import type { FC } from 'react';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
}

export const VisitorPages: FC<Props> = () => {
  return (
    <>
      <h4 className='sub-heading'>Pages</h4>

      <div className='table visitor-pages-table'>
        <table cellSpacing='0'>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Average time on page</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
      </div>
    </>
  );
};
