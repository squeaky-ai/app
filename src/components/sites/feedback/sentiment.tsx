import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { useSentiment } from 'hooks/use-sentiment';
import { getDateRange } from 'lib/dates';
import { Error } from 'components/error';
import { SentimentResponses } from 'components/sites/feedback/sentiment-responses';
import { SentimentReplies } from 'components/sites/feedback/sentiment-replies';
import { SentimentRatings } from 'components/sites/feedback/sentiment-ratings';
import { FeedbackTrend } from 'components/sites/feedback/feedback-trend'
import { SentimentColumns } from 'components/sites/feedback/sentiment-columns';
import { Period } from 'components/sites/period/period';
import { SentimentFilters } from 'components/sites/filters/sentiment/filters';
import { PageLoading } from 'components/sites/page-loading';
import { COLUMNS, DEFAULT_COLUMNS } from 'data/sentiment/constants';
import { getColumnPreferences } from 'lib/tables';
import { Preference } from 'lib/preferences';
import { useSort } from 'hooks/use-sort';
import { useFilters } from 'hooks/use-filters';
import { usePeriod } from 'hooks/use-period';
import { FeedbackSentimentResponseSort, FeedbackSentimentResponseFilters } from 'types/graphql';
import type { Column, ValueOf } from 'types/common';

export const Sentiment: FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);
  const [columns, setColumns] = React.useState<Column[]>(DEFAULT_COLUMNS);

  const { period, setPeriod } = usePeriod('sentiment');
  const { filters, setFilters } = useFilters<FeedbackSentimentResponseFilters>('sentiment');
  const { sort, setSort } = useSort<FeedbackSentimentResponseSort>('sentiment');

  const updateFilters = (key: keyof FeedbackSentimentResponseFilters, value: ValueOf<FeedbackSentimentResponseFilters>) => {
    setPage(1);
    setFilters({ ...filters, [key]: value });
  };

  const { sentiment, loading, error } = useSentiment({
    page,
    size,
    sort,
    filters, 
    range: getDateRange(period),
  });
  
  const hasResults = sentiment.replies.responses.length > 0;

  React.useEffect(() => {
    getColumnPreferences(Preference.SENTIMENT_COLUMNS, COLUMNS, setColumns);
  }, []);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='sentiment-grid'>
       <h4 className='heading-overview'>
        Overview
        <Period period={period} onChange={setPeriod} />
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
          <menu>
            <SentimentColumns 
              columns={columns}
              setColumns={setColumns}
            />
            <SentimentFilters 
              filters={filters}
              updateFilters={updateFilters}
            />
          </menu>
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
