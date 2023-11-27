import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Error } from 'components/error';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { PageLoading } from 'components/sites/page-loading';
import { Unlock } from 'components/sites/unlock';
import { ErrorsTable } from 'components/sites/errors/errors-table';
import { ErrorCounts } from 'components/sites/errors/error-counts';
import { Period } from 'components/sites/period/period';
import { Pagination } from 'components/pagination';
import { PageSize } from 'components/sites/page-size';
import { usePeriod } from 'hooks/use-period';
import { PageProps } from 'types/page';
import { useErrors } from 'hooks/use-errors';
import { getDateRange } from 'lib/dates';
import { ErrorsSort } from 'types/graphql';

const SitesErrors: NextPage<PageProps> = ({ user }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(20);
  const [sort, setSort] = React.useState<ErrorsSort>(ErrorsSort.ErrorCountDesc);

  const { period, setPeriod } = usePeriod('errors');

  const { errors, counts, loading, error } = useErrors({
    page,
    sort,
    size,
    range: getDateRange(period),
  });

  const hasErrors = errors.items.length > 0;

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Errors</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Errors' }]} />

            <div className='errors-header'>
              <h4 className='title'>Errors</h4>

              {site.recordingsCount > 0 && (
                <Period period={period} onChange={setPeriod} />
              )}
            </div>

            <EmptyState
              site={site}
              title='There are currently no errors recorded'
              illustration='illustration-17'
            />

            <Unlock site={site} />

            {loading && (
              <PageLoading />
            )}

            {!loading && !hasErrors && site.recordingsCount > 0 && (
              <Container className='sm centered empty-state show'>
                <div className='empty-state-contents'>
                  <Illustration illustration='illustration-18' height={240} width={320} alt='Illustration to represent the empty errors page' />
                  <h4>Your site has no errors for the time period you&apos;ve selected</h4>
                </div>
              </Container>
            )}

            {!loading && hasErrors && (
              <>
                <ErrorCounts
                  counts={counts}
                  period={period} 
                />

                <ErrorsTable 
                  site={site}
                  errors={errors.items}
                  sort={sort}
                  setSort={setSort}
                />
                <div className='errors-table-footer'>
                  <Pagination
                    currentPage={page}
                    pageSize={errors.pagination.pageSize}
                    total={errors.pagination.total}
                    setPage={setPage}
                  />
                  <PageSize
                    value={errors.pagination.pageSize} 
                    onChange={setSize}
                    show={errors.pagination.total > 20}
                  />
                </div>
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesErrors;
