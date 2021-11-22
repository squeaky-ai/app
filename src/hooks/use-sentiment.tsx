import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SENTIMENT_QUERY } from 'data/sentiment/queries';
import type { Site } from 'types/site';
import type { TimeRange } from 'lib/dates';
import type { Sentiment, SentimentResponseSortBy } from 'types/sentiment';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: SentimentResponseSortBy;
  range: TimeRange;
}

interface UseSentiment {
  loading: boolean;
  error: boolean;
  sentiment: Sentiment;
}

export const useSentiment = ({ page, size, sort, range }: Props): UseSentiment => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_SENTIMENT_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      sort,
      ...range,
    }
  });

  if (error) {
    console.error(error);
  }

  const fallback: Sentiment = {
    responses: {
      items: [], 
      pagination: { 
        pageSize: 0, 
        total: 0, 
        sort: 'timestamp__desc' 
      } 
    },
    replies: {
      total: 0,
      responses: [],
    },
    ratings: {
      score: 0,
      trend: 0,
      responses: [],
    }
  };

  return {
    loading,
    error: !!error,
    sentiment: data
      ? data.site.sentiment
      : previousData ? previousData.site.sentiment : fallback
  };
};
