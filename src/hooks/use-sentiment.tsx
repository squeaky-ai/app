import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SENTIMENT_QUERY } from 'data/sentiment/queries';
import { FeedbackSentimentResponseSort } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, Sentiment } from 'types/graphql';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: FeedbackSentimentResponseSort;
  range: TimeRange;
}

interface UseSentiment {
  loading: boolean;
  error: boolean;
  sentiment: Sentiment;
}

export const useSentiment = ({ page, size, sort, range }: Props): UseSentiment => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_SENTIMENT_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      sort,
      ...range,
    }
  });

  const fallback: Sentiment = {
    responses: {
      items: [], 
      pagination: { 
        pageSize: 0, 
        total: 0, 
        sort: FeedbackSentimentResponseSort.TimestampDesc, 
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
    sentiment: data ? data.site.sentiment : fallback,
  };
};
