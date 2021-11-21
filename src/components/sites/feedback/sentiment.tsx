import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { useSentiment } from 'hooks/use-sentiment';
import { getDateRange, TimePeriod } from 'lib/dates';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { Select, Option } from 'components/select';
import { SentimentResponses } from 'components/sites/feedback/sentiment-responses';
import { SentimentReplies } from 'components/sites/feedback/sentiment-replies';
import { SentimentRatings } from 'components/sites/feedback/sentiment-ratings';
import { TIME_PERIODS } from 'data/nps/constants';
import type { SentimentResponseSortBy } from 'types/sentiment';

export const Sentiment: FC = () => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(10);
  const [sort, setSort] = React.useState<SentimentResponseSortBy>('timestamp__desc');
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');

  const { sentiment, loading, error } = useSentiment({ page, size, sort, range: getDateRange(period) });
  
  const hasResults = sentiment.responses.pagination.total > 0;

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='sentiment-grid'>
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

      <Card className='card-rating'>
        <h4>Sentiment Rating</h4>
        {hasResults 
          ? <SentimentRatings />
          : <NoData />
        }
      </Card>

      <Card className='card-response'>
        <h4>
          Responses
          <span>
            {hasResults && <h3>{sentiment.replies.total}</h3>}
          </span>
        </h4>
        {hasResults  
          ? <SentimentReplies replies={sentiment.replies} />
          : <NoData />
        }
      </Card>

      <h4 className='heading-responses'>
        Responses
      </h4>

      <SentimentResponses
        page={page}
        sort={sort}
        size={size}
        setPage={setPage}
        setSort={setSort}
        setSize={setSize}
        responses={sentiment.responses}
      />
    </div>
  );
};
