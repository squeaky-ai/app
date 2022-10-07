import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Card } from 'components/card';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Pagination } from 'components/pagination';
import { NoResponses } from 'components/sites/feedback/no-responses';
import { NpsResponsesItem } from 'components/sites/feedback/nps-responses-item';
import { COLUMNS } from 'data/nps/constants';
import { getColumnStyles } from 'lib/tables';
import { FeedbackNpsResponseSort, Team } from 'types/graphql';
import type { FeedbackNpsResponse } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  member?: Team;
  page: number;
  sort: FeedbackNpsResponseSort;
  size: number;
  setPage: (page: number) => void;
  setSort: (sort: FeedbackNpsResponseSort) => void;
  setSize: (size: number) => void;
  responses: FeedbackNpsResponse;
  columns: Column[];
}

export const NpsResponses: FC<Props> = ({ 
  member,
  page, 
  sort, 
  size, 
  setPage, 
  setSort, 
  setSize, 
  responses, 
  columns 
}) => {
  const { items, pagination } = responses;

  const hasResults = pagination.total > 0;
  const { rowStyle, tableClassNames } = getColumnStyles(COLUMNS, columns);

  return (
    <Card className={classnames('card-responses', { 'has-results': hasResults })}>
      {!hasResults && (
        <NoResponses />
      )}

      {hasResults && (
        <>
          <Table className={classnames('nps-table', tableClassNames)}>
            <Row head style={rowStyle}>
              <Cell>
                Score
              </Cell>
              <Cell>
                Visitor ID
              </Cell>
              <Cell>
                Recording ID
              </Cell>
              <Cell>
                Date &amp; Time
                <Sort 
                  name='timestamp' 
                  order={sort} 
                  onAsc={() => setSort(FeedbackNpsResponseSort.TimestampAsc)} 
                  onDesc={() => setSort(FeedbackNpsResponseSort.TimestampDesc)}
                />
              </Cell>
              <Cell>
                Follow-up response
              </Cell>
              <Cell>
                Email
              </Cell>
              <Cell>
                Device &amp; Viewport
              </Cell>
              <Cell>
                Browser
              </Cell>
              <Cell />
            </Row>
            {items.map(i => (
              <NpsResponsesItem key={i.id} response={i} style={rowStyle} member={member} />
            ))}
          </Table>
          <div className='nps-responses-footer'>
            <Pagination
              currentPage={page}
              pageSize={size}
              setPage={setPage}
              total={pagination.total}
              scrollToTop={false}
            />
            <PageSize 
              value={pagination.pageSize} 
              onChange={setSize}
              show={pagination.total > 10}
              sizes={[10, 25, 50]}
            />
          </div>
        </>
      )}
    </Card>
  );
};
