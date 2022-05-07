import React from 'react';
import type { FC } from 'react';
import { Period } from 'components/sites/period/period';
import { JourneysPages } from 'components/sites/journeys/journeys-pages';
import { NoResults } from 'components/sites/no-results';
import { JourneysGraph } from 'components/sites/journeys/journeys-graph';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { usePages } from 'hooks/use-pages';
import { useJourneys } from 'hooks/use-journeys';
import { getDateRange } from 'lib/dates';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  setPeriod: (page: TimePeriod) => void;
}

export const Journeys: FC<Props> = ({ period, setPeriod }) => {
  const [startPage, setStartPage] = React.useState<string>(null);
  const [endPage, setEndPage] = React.useState<string>(null);

  const { pages, loading: pagesLoading } = usePages();

  const { loading: journeysLoading, error, journeys } = useJourneys({
    startPage,
    endPage,
    range: getDateRange(period) 
  });

  const loading = pagesLoading || journeysLoading;

  if (error) {
    return <Error />;
  }

  return (
    <div className='journeys'>
      <div className='controls'>
        <JourneysPages label='Start page' page={startPage} pages={pages} setPage={setStartPage} />
        <JourneysPages label='End page' page={endPage} pages={pages} setPage={setEndPage} />
        <Period period={period} onChange={setPeriod} />
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
            <JourneysGraph journeys={journeys} />
          )}
        </div>
      )}
    </div>
  );
};
