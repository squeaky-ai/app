import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import type { AnalyticsReferrers as AnalyticsReferrersType } from 'types/graphql';

interface Props {
  referrers: AnalyticsReferrersType;
  page: number;
  setPage: (page: number) => void;
}

export const AnalyticsReferrers: FC<Props> = ({ referrers, page, setPage }) => (
  <>
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>Number of users</Cell>
      </Row>
      {referrers.items.map(referrer => {
        const label = referrer.referrer === 'Direct' 
          ? <>Direct <i>(none)</i></> 
          : referrer.referrer;

        return (
          <Row key={referrer.referrer}>
            <Cell>
              <Tooltip button={label} fluid>
                {label}
              </Tooltip>
            </Cell>
            <Cell><b>{referrer.count}</b> <span className='percentage'>({referrer.percentage}%)</span></Cell>
          </Row>
        );
      })}
    </Table>

    <Pagination
      pageSize={10}
      currentPage={page}
      total={referrers.pagination.total}
      setPage={setPage}
      scrollToTop={false}
    />
  </>
);
