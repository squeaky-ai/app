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
import { FeedbackTrend } from 'components/sites/feedback/feedback-trend'
import { SentimentColumns } from 'components/sites/feedback/sentiment-columns';
import { TIME_PERIODS } from 'data/nps/constants';
import { COLUMNS, DEFAULT_COLUMNS } from 'data/sentiment/constants';
import { getColumnPreferences } from 'lib/tables';
import { Preference } from 'lib/preferences';
import { FeedbackSentimentResponseSort } from 'types/graphql';
import type { Column } from 'types/common';

export const Sentiment: FC = () => {
  const [page, setPage] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(10);
  const [sort, setSort] = React.useState<FeedbackSentimentResponseSort>(FeedbackSentimentResponseSort.TimestampDesc);
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_COLUMNS);

  const { sentiment, loading, error } = useSentiment({ page, size, sort, range: getDateRange(period) });
  
  const hasResults = sentiment.responses.pagination.total > 0;

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TimePeriod);
  };

  React.useEffect(() => {
    getColumnPreferences(Preference.SENTIMENT_COLUMNS, COLUMNS, setColumns);
  }, []);

  // If you just check loading it will flash when changing
  // sort/pagination
  if (loading && sentiment.responses.items.length === 0) {
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
        <div className='heading'>
          <h5>Sentiment Rating</h5>
          <h3>{hasResults ? sentiment.ratings.score.toFixed(2) : ''}</h3>
          {hasResults && <FeedbackTrend value={Number(sentiment.ratings.trend.toFixed(2))} />}
        </div>
        {hasResults
          ? <SentimentRatings period={period} ratings={sentiment.ratings.responses} />
          : <NoData />
        }
      </Card>

      <Card className='card-response'>
        <div className='heading'>
          <h5>Responses</h5>
          {hasResults && <h3>{sentiment.replies.total}</h3>}
        </div>
        {hasResults  
          ? <SentimentReplies replies={sentiment.replies} />
          : <NoData />
        }
      </Card>

      <h4 className='heading-responses'>
        Responses
        {hasResults && (
          <SentimentColumns 
            columns={columns}
            setColumns={setColumns}
          />
        )}
      </h4>

      <SentimentResponses
        page={page}
        sort={sort}
        size={size}
        setPage={setPage}
        setSort={setSort}
        setSize={setSize}
        responses={sentiment.responses}
        columns={columns}
      />
    </div>
  );
};
