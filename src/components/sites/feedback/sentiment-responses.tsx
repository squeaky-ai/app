import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Card } from 'components/card';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { PageSize } from 'components/sites/page-size';
import { Pagination } from 'components/pagination';
import { NoResponses } from 'components/sites/feedback/no-responses';
import { SentimentResponsesItem } from 'components/sites/feedback/sentiment-responses-item';
import type { SentimentResponse } from 'types/sentiment';
import type { SentimentResponseSortBy } from 'types/sentiment';

interface Props {
  page: number;
  sort: SentimentResponseSortBy;
  size: number;
  setPage: (page: number) => void;
  setSort: (sort: SentimentResponseSortBy) => void;
  setSize: (size: number) => void;
  responses: SentimentResponse;
}

export const SentimentResponses: FC<Props> = ({ page, sort, size, setPage, setSort, setSize, responses }) => {
  const { items, pagination } = responses;

  const hasResults = pagination.total > 0;

  return (
    <Card className={classnames('card-responses', { 'has-results': hasResults })}>
      {!hasResults && (
        <NoResponses />
      )}

      {hasResults && (
        <>
          <Table className='sentiment-table'>
            <Row head>
              <Cell>
                Rating
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
                  name='duration' 
                  order={sort} 
                  onAsc={() => setSort('timestamp__asc')} 
                  onDesc={() => setSort('timestamp__desc')} 
                />
              </Cell>
              <Cell>
                Follow-up response
              </Cell>
              <Cell />
            </Row>
            {items.map(i => (
              <SentimentResponsesItem key={i.id} response={i} />
            ))}
          </Table>
          <div className='sentiment-responses-footer'>
            <Pagination
              currentPage={page + 1}
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
