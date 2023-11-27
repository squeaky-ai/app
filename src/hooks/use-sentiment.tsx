import { useQuery } from '@apollo/client';
import { GET_SENTIMENT_QUERY } from 'data/sentiment/queries';
import { FeedbackSentimentResponseSort } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, Sentiment, FeedbackSentimentResponseFilters } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: FeedbackSentimentResponseSort;
  filters: FeedbackSentimentResponseFilters;
  range: TimeRange;
}

interface UseSentiment {
  loading: boolean;
  error: boolean;
  sentiment: Sentiment;
}

export const useSentiment = ({ page, size, sort, filters, range }: Props): UseSentiment => {
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_SENTIMENT_QUERY, {
    variables: { 
      siteId,
      page, 
      size,
      sort,
      filters,
      ...range,
    },
    skip: !siteId,
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
