import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { useNps } from 'hooks/use-nps';
import { Error } from 'components/error';
import { getDateRange } from 'lib/dates';
import { NpsResponses } from 'components/sites/feedback/nps-responses';
import { NpsRatings } from 'components/sites/feedback/nps-ratings';
import { NpsReplies } from 'components/sites/feedback/nps-replies';
import { FeedbackTrend } from 'components/sites/feedback/feedback-trend';
import { NpsScore } from 'components/sites/feedback/nps-score';
import { NpsColumns } from 'components/sites/feedback/nps-columns';
import { Period } from 'components/sites/period/period';
import { PageLoading } from 'components/sites/page-loading';
import { NpsFilters } from 'components/sites/filters/nps/filters';
import { percentage } from 'lib/maths';
import { usePeriod } from 'hooks/use-period';
import { useSort } from 'hooks/use-sort';
import { useColumns } from 'hooks/use-columns';
import { useFilters } from 'hooks/use-filters';
import { FeedbackNpsResponseFilters, FeedbackNpsResponseSort, Team } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  member: Team;
}

export const Nps: FC<Props> = ({ member }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);

  const { period, setPeriod } = usePeriod('nps');
  const { filters, setFilters } = useFilters<FeedbackNpsResponseFilters>('nps');
  const { sort, setSort } = useSort<FeedbackNpsResponseSort>('nps');
  const { columns, columnsReady, setColumns } = useColumns('nps');

  const updateFilters = (key: keyof FeedbackNpsResponseFilters, value: ValueOf<FeedbackNpsResponseFilters>) => {
    setPage(1);
    setFilters({ ...filters, [key]: value });
  };

  const { nps, error, loading } = useNps({ 
    page,
    size,
    sort,
    filters,
    range: getDateRange(period) 
  });

  const hasResults = nps.replies.responses.length > 0;

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='nps-grid'>
      <h4 className='heading-overview'>
        Overview
        <Period period={period} onChange={setPeriod} />
      </h4>

      <Card className='card-nps'>
        <div className='heading'>
          <h5>NPS®</h5>
          <h3>{hasResults ? nps.scores.score : ''}</h3>
          {hasResults && <FeedbackTrend value={nps.scores.trend} />}
        </div>
        {hasResults
          ? <NpsScore scores={nps.scores} period={period} />
          : <NoData />
        }
      </Card>

      <Card className='card-response'>
        <div className='heading'>
          <h5>Responses</h5>
          {hasResults && <FeedbackTrend value={nps.replies.trend} />}
        </div>
        {hasResults
          ? <NpsReplies replies={nps.replies} period={period} />
          : <NoData />
        }
      </Card>

      <Card className='card-ratings'>
        <div className='heading'>
          <h5>Ratings</h5>
        </div>
        {hasResults
          ? <NpsRatings ratings={nps.ratings} />
          : <NoData />
        }
      </Card>

      <Card className='card-displays'>
        <div className='items'>
          <div className='item'>
            <p>Displays</p>
            {hasResults
              ? <h3 className='blue'>{nps.stats.displays.toLocaleString()}</h3>
              : <NoData short />
            }
          </div>
          <div className='item'>
            <p>Responses</p>
            {hasResults
              ? <h3 className='blue'>{nps.stats.ratings.toLocaleString()}</h3>
              : <NoData short />
            }
          </div>
          <div className='item'>
            <p>Response Rate</p>
            {hasResults
              ? <h3 className='purple'>{percentage(nps.stats.displays, nps.stats.ratings)}%</h3>
              : <NoData short />
            }
          </div>
        </div>
      </Card>

      <Card className='card-results'>
        <div className='items'>
          <div className='item'>
            <p>Promoters</p>
            {hasResults
              ? <h3 className='blue'>{nps.groups.promoters.toLocaleString()}</h3>
              : <NoData short />
            }
          </div>
          <div className='item'>
            <p>Passives</p>
            {hasResults
              ? <h3 className='purple'>{nps.groups.passives.toLocaleString()}</h3>
              : <NoData short />
            }
          </div>
          <div className='item'>
            <p>Detractors</p>
            {hasResults
              ? <h3 className='rose'>{nps.groups.detractors.toLocaleString()}</h3>
              : <NoData short />
            }
          </div>
        </div>
      </Card>

      <h4 className='heading-responses'>
        Responses
        {hasResults && (
          <menu>
            <NpsColumns 
              columns={columns}
              setColumns={setColumns}
            />
            <NpsFilters 
              filters={filters}
              updateFilters={updateFilters}
            />
          </menu>
        )}
      </h4>

      {columnsReady && (
        <NpsResponses 
          member={member}
          page={page}
          sort={sort}
          size={size}
          setPage={setPage}
          setSort={setSort}
          setSize={setSize}
          responses={nps.responses}
          columns={columns}
        />
      )}
    </div>
  );
};
