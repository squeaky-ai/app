import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import getConfig from 'next/config';
import { PageLoading } from 'components/sites/page-loading';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Input } from 'components/input';
import { Period } from 'components/sites/period/period';
import { Error } from 'components/error';
import { Cell, Row, Table, TableWrapper } from 'components/table';
import { useAdminAdTracking } from 'hooks/use-admin-ad-tracking';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { usePeriod } from 'hooks/use-period';
import { getDateRange } from 'lib/dates';
import { NoResults } from 'components/sites/no-results';

const { publicRuntimeConfig } = getConfig();

export const AdTracking: NextPage = () => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(25);

  const { period, setPeriod } = usePeriod('ad-tracking');

  const [input, setInput] = React.useState<string>('');
  const [utmContentIds, setUtmContentIds] = React.useState<string[]>([]);

  const { adTracking, error, loading } = useAdminAdTracking({
    utmContentIds,
    size,
    page,
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
            <span>{adTracking.pagination.total}</span>
          )}
        </h4>
        <menu>
          <Period period={period} onChange={setPeriod} />
        </menu>
      </div>

      {loading && (
        <PageLoading />
      )}

      {!loading && !hasResults && (
        <NoResults title='There is no ad tracking for your chosen period' illustration='illustration-2' />
      )}

      {!loading && hasResults && (
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
                <Table className='ad-tracking-table'>
                  <Row className='head'>
                    <Cell>
                      Visitor ID
                    </Cell>
                    <Cell>
                      User ID
                    </Cell>
                    <Cell>
                      User Name
                    </Cell>
                    <Cell>
                      User Created At
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
                      Site Created At
                    </Cell>
                    <Cell>
                      Site Verified At
                    </Cell>
                    <Cell>
                      UTM Content
                    </Cell>
                  </Row>
                  {adTracking.items.map((a, index) => (
                    <Row key={`${a.visitorId}-${index}`}>
                      <Cell>
                        <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${a.visitorId}`}>{a.visitorId}</Link>
                      </Cell>
                      <Cell>
                        {a.userId
                          ? <Link href={`/__admin/users/${a.userId}`}>{a.userId}</Link>
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {a.userName || '-'}
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
                        {a.siteCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteVerifiedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.utmContent}
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
