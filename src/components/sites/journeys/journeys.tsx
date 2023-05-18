import React from 'react';
import type { FC } from 'react';
import { Period } from 'components/sites/period/period';
import { JourneysPages } from 'components/sites/journeys/journeys-pages';
import { JourneysPosition } from 'components/sites/journeys/journeys-position';
import { NoResults } from 'components/sites/no-results';
import { JourneysGraph } from 'components/sites/journeys/journeys-graph';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { PageRoutes } from 'components/sites/page-routes';
import { useJourneys } from 'hooks/use-journeys';
import { getDateRange } from 'lib/dates';
import { PathPosition, Site, SitesPage, Team } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  page: string;
  pages: SitesPage[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Journeys: FC<Props> = ({ site, member, page, pages, period, setPage, setPeriod }) => {
  const [position, setPosition] = React.useState<PathPosition>(PathPosition.Start);

  const { loading, error, journeys, routes, refetch } = useJourneys({
    page,
    position,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  return (
    <div className='journeys'>
      <div className='controls'>
        <menu className='left'>
          <JourneysPosition position={position} setPosition={setPosition} />
          <JourneysPages page={page} pages={pages} setPage={setPage} />
        </menu>
        <menu className='right'>
          <PageRoutes site={site} member={member} routes={routes} onUpdate={refetch} />
          <Period period={period} onChange={setPeriod} />
        </menu>
      </div>

      {loading && (
        <PageLoading />
      )}

      {!loading && (
        <div className='journey-wrapper'>
          {journeys.length === 0 && (
            <NoResults illustration='illustration-13' title='There are no matching journeys' />
          )}

          {journeys.length > 0 &&  (
            <JourneysGraph 
              site={site}
              position={position}
              journeys={journeys} 
              setPage={setPage}
              setPosition={setPosition}
            />
          )}
        </div>
      )}
    </div>
  );
};
