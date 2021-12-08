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
import { COLUMNS } from 'data/sentiment/constants';
import { getColumnStyles } from 'lib/tables';
import { FeedbackSentimentResponseSort } from 'types/graphql';
import type { FeedbackSentimentResponse } from 'types/graphql';
import type { Column } from 'types/common';

interface Props {
  page: number;
  sort: FeedbackSentimentResponseSort;
  size: number;
  setPage: (page: number) => void;
  setSort: (sort: FeedbackSentimentResponseSort) => void;
  setSize: (size: number) => void;
  responses: FeedbackSentimentResponse;
  columns: Column[];
}

export const SentimentResponses: FC<Props> = ({ page, sort, size, setPage, setSort, setSize, responses, columns }) => {
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
          <Table className={classnames('sentiment-table', tableClassNames)}>
            <Row style={rowStyle} head>
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
                  name='timestamp' 
                  order={sort} 
                  onAsc={() => setSort(FeedbackSentimentResponseSort.TimestampAsc)} 
                  onDesc={() => setSort(FeedbackSentimentResponseSort.TimestampDesc)} 
                />
              </Cell>
              <Cell>
                Follow-up response
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
              <SentimentResponsesItem key={i.id} response={i} style={rowStyle} />
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
