import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Pagination } from 'components/pagination';
import { Sort } from 'components/sort';
import { VisitorRecordingsItem } from 'components/sites/visitor-recordings-item';
import { Table, Row, Cell } from 'components/table';
import { BASE_PATH } from 'data/common/constants';
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
      {items.length > 0 && (
        <Table className='visitor-recordings-table hover'>
          <Row head>
            <Cell>
              Status
            </Cell>
            <Cell>
              Recording ID
            </Cell>
            <Cell>
              Date &amp; Time
              <Sort 
                name='connected_at' 
                order={sort} 
                onAsc={() => setSort('connected_at__asc')} 
                onDesc={() => setSort('connected_at__desc')} 
              />
            </Cell>
            <Cell>
              Duration
              <Sort 
                name='duration' 
                order={sort} 
                onAsc={() => setSort('duration__asc')} 
                onDesc={() => setSort('duration__desc')} 
              />
            </Cell>
            <Cell>
              Pages
              <Sort 
                name='page_count' 
                order={sort} 
                onAsc={() => setSort('page_count__asc')} 
                onDesc={() => setSort('page_count__desc')} 
              />
            </Cell>
            <Cell>
              Start &amp; Exit URL
            </Cell>
            <Cell>Device &amp; Viewport (px)</Cell>
            <Cell>Browser</Cell>
            <Cell />
          </Row>
          {items.map(recording => (
            <VisitorRecordingsItem key={recording.id} recording={recording} />
          ))}
        </Table>
      )}

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Image src={`${BASE_PATH}/empty-state-1.svg`} height={160} width={210} />
          <h4>There are currently no recordings for this visitor.</h4>
        </div>
      )}

      <Pagination 
        currentPage={page + 1} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
