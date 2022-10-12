import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { Period } from 'components/sites/period/period';
import { ErrorDetails } from 'components/sites/errors/error-details';
import { RecordingsColumns } from 'components/sites/recordings/recordings-columns';
import { VisitorsColumns } from 'components/sites/visitors/visitors-columns';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { RecordingsBulkActions } from 'components/sites/recordings/recordings-bulk-actions';
import { usePeriod } from 'hooks/use-period';
import { Unlock } from 'components/sites/unlock';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useRouter } from 'next/router';
import { useErrorsDetails } from 'hooks/use-errors-details';
import { getDateRange } from 'lib/dates';
import { useColumns } from 'hooks/use-columns';
import { ErrorTab } from 'types/errors';

const SitesErrorsError: NextPage<ServerSideProps> = ({ user }) => {
  const [tab, setTab] = React.useState<ErrorTab>(ErrorTab.DETAILS);
  const [recordingsSelected, setRecordingsSelected] = React.useState<string[]>([]);

  const { query } = useRouter();
  const { period, setPeriod } = usePeriod('errors');

  const { columns: visitorsColumns, setColumns: setVisitorsColumns } = useColumns('visitors');
  const { columns: recordingsColumns, setColumns: setRecordingsColumns } = useColumns('recordings');

  const { details, counts, error, loading } = useErrorsDetails({ 
    id: query.error_id as string,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Errors | Details</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Errors', href: `/sites/${site.id}/errors` }, { name: 'Error Details' }]} />

            <div className='errors-header'>
              <h4 className='title'>Error Details</h4>

              {site.recordingsCount > 0 && (
                <menu>
                  <Period period={period} onChange={setPeriod} />
                  {tab === ErrorTab.VISITORS && (
                    <VisitorsColumns columns={visitorsColumns} setColumns={setVisitorsColumns} />
                  )}
                  {tab === ErrorTab.RECORDINGS && (
                    <>
                      <RecordingsBulkActions
                        site={site}
                        member={member}
                        selected={recordingsSelected}
                        setSelected={setRecordingsSelected}
                      />
                      <RecordingsColumns columns={recordingsColumns} setColumns={setRecordingsColumns} />
                    </>
                  )}
                </menu>
              )}
            </div>

            <Unlock site={site} />

            {loading && (
              <PageLoading />
            )}

            {!loading && !details && (
              <Container className='sm centered empty-state show'>
                <div className='empty-state-contents'>
                  <Illustration illustration='illustration-18' height={240} width={320} alt='Illustration to represent the empty errors page' />
                  <h4>Your site has no errors for the time period you&apos;ve selected</h4>
                </div>
              </Container>
            )}

            {!loading && details && (
              <>
                <ErrorDetails
                  tab={tab}
                  site={site}
                  member={member}
                  counts={counts}
                  period={period}
                  details={details}
                  setTab={setTab}
                  visitorsColumns={visitorsColumns}
                  recordingsColumns={recordingsColumns}
                  recordingsSelected={recordingsSelected}
                  setRecordingsSelected={setRecordingsSelected}
                /> 
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesErrorsError;
export { getServerSideProps };
