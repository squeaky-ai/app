import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import { toHoursMinutesAndSeconds } from 'lib/dates';
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
        <Cell>Number of visitors</Cell>
        <Cell>Average session duration</Cell>
        <Cell />
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
            <Cell><b>{referrer.count.toLocaleString()}</b> <span className='percentage'>({referrer.percentage.toFixed(2)}%)</span></Cell>
            <Cell>{toHoursMinutesAndSeconds(Number(referrer.duration))}</Cell>
            <Cell className='filters-links'>
              <FiltersRecordingsLink 
                action={{ referrers: [referrer.referrer === 'Direct' ? 'none' : referrer.referrer] }}
                hint='View recordings that came from this traffic source'
              />

              <FiltersVisitorsLink 
                action={{ referrers: [referrer.referrer === 'Direct' ? 'none' : referrer.referrer] }}
                hint='View visitors that came from this traffic source'
              />
            </Cell>
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
