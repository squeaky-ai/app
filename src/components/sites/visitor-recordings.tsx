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
                name='date' 
                order={sort} 
                onAsc={() => setSort('DATE_ASC')} 
                onDesc={() => setSort('DATE_DESC')} 
              />
            </Cell>
            <Cell>
              Duration
              <Sort 
                name='duration' 
                order={sort} 
                onAsc={() => setSort('DURATION_ASC')} 
                onDesc={() => setSort('DURATION_DESC')} 
              />
            </Cell>
            <Cell>
              Pages
              <Sort 
                name='page_size' 
                order={sort} 
                onAsc={() => setSort('PAGE_SIZE_ASC')} 
                onDesc={() => setSort('PAGE_SIZE_DESC')} 
              />
            </Cell>
            <Cell>
              Start &amp; Exit URL
            </Cell>
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
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
