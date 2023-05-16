import React from 'react';

import {
  RecordingsSort,
  VisitorsSort,
  FeedbackNpsResponseSort,
  FeedbackSentimentResponseSort,
  EventsCaptureSort,
  AnalyticsPagesSort,
  EventsFeedSort,
  AnalyticsBrowsersSort,
  AdminAdTrackingSort,
} from 'types/graphql';

type ComponentType = 
  'recordings' |
  'visitors' |
  'nps' |
  'sentiment' |
  'events' |
  'analytics-pages' |
  'events-feed' |
  'analytics-browsers' |
  'ad-tracking';

interface UseSort<T> {
  sort: T;
  setSort: (sort: T) => void;
}

const getDefaultSort = (type: ComponentType) => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`sort::${type}`);

    if (existing) {
      try {
        return JSON.parse(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'recordings':
      return RecordingsSort.ConnectedAtDesc;
    case 'visitors':
      return VisitorsSort.LastActivityAtDesc;
    case 'nps':
      return FeedbackNpsResponseSort.TimestampDesc;
    case 'sentiment':
      return FeedbackSentimentResponseSort.TimestampDesc;
    case 'events':
      return EventsCaptureSort.CountDesc;
    case 'analytics-pages':
      return AnalyticsPagesSort.ViewsDesc;
    case 'events-feed':
      return EventsFeedSort.TimestampDesc;
    case 'analytics-browsers':
      return AnalyticsBrowsersSort.CountDesc;
    case 'ad-tracking':
      return AdminAdTrackingSort.UserCreatedAtDesc;
  }
};

export const useSort =  <T>(type: ComponentType): UseSort<T> => {
  const [sort, setSort] = React.useState<T>(getDefaultSort(type));

  const handleSortChange = (sort: T) => {
    setSort(sort);
    sessionStorage.setItem(`sort::${type}`, JSON.stringify(sort));
  };

  return { sort, setSort: handleSortChange };
};
