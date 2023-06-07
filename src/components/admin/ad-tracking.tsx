import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import getConfig from 'next/config';
import classnames from 'classnames';
import { PageLoading } from 'components/sites/page-loading';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Input } from 'components/input';
import { Period } from 'components/sites/period/period';
import { Error } from 'components/error';
import { Sort } from 'components/sort';
import { Cell, Row, Table, TableWrapper } from 'components/table';
import { useAdminAdTracking } from 'hooks/use-admin-ad-tracking';
import { AdTrackingColumns } from 'components/admin/ad-tracking-columns';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { usePeriod } from 'hooks/use-period';
import { getDateRange } from 'lib/dates';
import { NoResults } from 'components/sites/no-results';
import { AdTrackingExport } from 'components/admin/ad-tracking-export';
import { AdminAdTrackingSort } from 'types/graphql';
import { useSort } from 'hooks/use-sort';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { useColumns } from 'hooks/use-columns';
import { getColumnStyles } from 'lib/tables';
import { AD_TRACKING_COLUMNS } from 'data/admin/constants';

const { publicRuntimeConfig } = getConfig();

export const AdTracking: NextPage = () => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { columns, columnsReady, setColumns } = useColumns('admin-ad-tracking');

  const { period, setPeriod } = usePeriod('ad-tracking');
  const { sort, setSort } = useSort<AdminAdTrackingSort>('ad-tracking');

  const [input, setInput] = React.useState<string>('');
  const [utmContentIds, setUtmContentIds] = React.useState<string[]>([]);

  const { rowStyle, tableClassNames } = getColumnStyles(AD_TRACKING_COLUMNS, columns);

  const { adTracking, error, loading } = useAdminAdTracking({
    utmContentIds,
    size,
    page,
    sort,
    range: getDateRange(period),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const utmContentIds = input
      .split(',')
      .map(u => u.trim())
      .filter(u => !!u);

    setUtmContentIds(utmContentIds);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const hasResults = adTracking.items.length > 0;

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className='admin-header'>
        <h4 className='title'>
          Ad Tracking
          {!loading && (
            <span>{adTracking.pagination.total.toLocaleString()}</span>
          )}
        </h4>
        <menu>
          <Period period={period} onChange={setPeriod} />
          <AdTrackingColumns
            columns={columns}
            setColumns={setColumns}
          />
          <AdTrackingExport
            utmContentIds={utmContentIds}
            sort={sort}
            range={getDateRange(period)}
            adTracking={adTracking}
          />
        </menu>
      </div>

      {loading && (
        <PageLoading />
      )}

      {!loading && !hasResults && (
        <NoResults title='There is no ad tracking for your chosen period' illustration='illustration-2' />
      )}

      {!loading && hasResults && columnsReady && (
        <Container>
          <form className='content-id-form' onSubmit={handleSubmit}>
            <Input 
              value={input}
              placeholder='Comma separated list, e.g. 2378942389,092308423,2402893742'
              onChange={handleChange} 
            />
            <Button className='primary' type='submit'>
              Update
            </Button>
          </form>

          {adTracking.pagination.total > 0 && (
            <>
              <TableWrapper>
                <Table className={classnames('ad-tracking-table', tableClassNames)}>
                  <Row className='head' style={rowStyle}>
                    <Cell>
                      Visitor ID
                    </Cell>
                    <Cell>
                      First Visited At
                    </Cell>
                    <Cell>
                      Average Session Duration
                    </Cell>
                    <Cell>
                      User ID
                    </Cell>
                    <Cell>
                      User Name
                    </Cell>
                    <Cell>
                      User Created At
                      <Sort
                        name='user_created_at' 
                        order={sort} 
                        onAsc={() => setSort(AdminAdTrackingSort.UserCreatedAtAsc)} 
                        onDesc={() => setSort(AdminAdTrackingSort.UserCreatedAtDesc)} 
                      />
                    </Cell>
                    <Cell>
                      Site ID
                    </Cell>
                    <Cell>
                      Site Name
                    </Cell>
                    <Cell>
                      Site Plan
                    </Cell>
                    <Cell>
                      Site Plan Updated At
                    </Cell>
                    <Cell>
                      Site Created At
                      <Sort
                        name='site_created_at' 
                        order={sort} 
                        onAsc={() => setSort(AdminAdTrackingSort.SiteCreatedAtAsc)} 
                        onDesc={() => setSort(AdminAdTrackingSort.SiteCreatedAtDesc)} 
                      />
                    </Cell>
                    <Cell>
                      Site Verified At
                      <Sort
                        name='site_verified_at' 
                        order={sort} 
                        onAsc={() => setSort(AdminAdTrackingSort.SiteVerifiedAtAsc)} 
                        onDesc={() => setSort(AdminAdTrackingSort.SiteVerifiedAtDesc)} 
                      />
                    </Cell>
                    <Cell>
                      GAD
                    </Cell>
                    <Cell>
                      GCLID
                    </Cell>
                    <Cell>
                      UTM Content
                    </Cell>
                  </Row>
                  {adTracking.items.map((a, index) => (
                    <Row key={`${a.visitorId}-${index}`} style={rowStyle}>
                      <Cell>
                        <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${a.visitorId}`}>{a.visitorVisitorId}</Link>
                      </Cell>
                      <Cell>
                        {a.visitorCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.activityDuration
                          ? toHoursMinutesAndSeconds(a.activityDuration)
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {a.userId
                          ? <Link href={`/__admin/users/${a.userId}`}>{a.userId}</Link>
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {!!a.userName?.trim() ? a.userName : '-'}
                      </Cell>
                      <Cell>
                        {a.userCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteId
                          ? <Link href={`/__admin/sites/${a.siteId}`}>{a.siteId}</Link>
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {a.siteName || '-'}
                      </Cell>
                      <Cell>
                        {a.sitePlanName || '-'}
                      </Cell>
                      <Cell>
                        {a.sitePlanUpdatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteVerifiedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.gad || '-'}
                      </Cell>
                      <Cell>
                        {a.gclid || '-'}
                      </Cell>
                      <Cell>
                        {a.utmContent || '-'}
                      </Cell>
                    </Row>
                  ))}
                </Table>
              </TableWrapper>
              {adTracking.pagination.total > 25 && (
                <div className='ad-tracking-table-footer'>
                  <Pagination
                    currentPage={page}
                    pageSize={size}
                    total={adTracking.pagination.total}
                    setPage={setPage}
                    scrollToTop={false}
                  />
                  <PageSize
                    value={adTracking.pagination.pageSize} 
                    onChange={setSize}
                    show={adTracking.pagination.total > 25}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};
