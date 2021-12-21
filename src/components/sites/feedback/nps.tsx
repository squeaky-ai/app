import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { useNps } from 'hooks/use-nps';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { Select, Option } from 'components/select';
import { getDateRange, TimePeriod } from 'lib/dates';
import { NpsResponses } from 'components/sites/feedback/nps-responses';
import { NpsRatings } from 'components/sites/feedback/nps-ratings';
import { NpsReplies } from 'components/sites/feedback/nps-replies';
import { FeedbackTrend } from 'components/sites/feedback/feedback-trend';
import { NpsScore } from 'components/sites/feedback/nps-score';
import { NpsColumns } from 'components/sites/feedback/nps-columns';
import { TIME_PERIODS } from 'data/nps/constants';
import { percentage } from 'lib/maths';
import { COLUMNS, DEFAULT_COLUMNS } from 'data/nps/constants';
import { getColumnPreferences } from 'lib/tables';
import { Preference } from 'lib/preferences';
import { FeedbackNpsResponseSort } from 'types/graphql';
import type { Column } from 'types/common';

export const Nps: FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);
  const [sort, setSort] = React.useState<FeedbackNpsResponseSort>(FeedbackNpsResponseSort.TimestampDesc);
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_COLUMNS);

  const { nps, error, loading } = useNps({ page, size, sort, range: getDateRange(period) });

  const hasResults = nps.responses.pagination.total > 0;

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };

  React.useEffect(() => {
    getColumnPreferences(Preference.NPS_COLUMNS, COLUMNS, setColumns);
  }, []);

  // If you just check loading it will flash when changing
  // sort/pagination
  if (loading && nps.responses.items.length === 0) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='nps-grid'>
      <h4 className='heading-overview'>
        Overview
        <div className='period'>
          <p><b>Period:</b></p>
          <Select onChange={handleDateChange} value={period}>
            {TIME_PERIODS.map(p => (
              <Option value={p.key} key={p.key}>
                {p.name}
              </Option>
            ))}
          </Select>
        </div>
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
            <p>Ratings</p>
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
          <NpsColumns 
            columns={columns}
            setColumns={setColumns}
          />
        )}
      </h4>

      <NpsResponses 
        page={page}
        sort={sort}
        size={size}
        setPage={setPage}
        setSort={setSort}
        setSize={setSize}
        responses={nps.responses}
        columns={columns}
      />
    </div>
  );
};
