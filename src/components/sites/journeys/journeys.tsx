import React from 'react';
import type { FC } from 'react';
import { Period } from 'components/sites/period/period';
import { JourneysPages } from 'components/sites/journeys/journeys-pages';
import { JourneysPosition } from 'components/sites/journeys/journeys-position';
import { NoResults } from 'components/sites/no-results';
import { JourneysGraph } from 'components/sites/journeys/journeys-graph';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { JourneysDepth } from 'components/sites/journeys/journeys-depth';
import { useJourneys } from 'hooks/use-journeys';
import { getDateRange } from 'lib/dates';
import { PathPosition } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  page: string;
  pages: string[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Journeys: FC<Props> = ({ page, pages, period, setPage, setPeriod }) => {
  const [depth, setDepth] = React.useState<number>(5);
  const [position, setPosition] = React.useState<PathPosition>(PathPosition.Start);

  const { loading, error, journeys } = useJourneys({
    page,
    position,
    range: getDateRange(period) 
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
          <JourneysDepth depth={depth} setDepth={setDepth} />
        </menu>
        <menu className='right'>
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
              journeys={journeys} 
              depth={depth}
              setPage={setPage}
              setPosition={setPosition}
            />
          )}
        </div>
      )}
    </div>
  );
};
