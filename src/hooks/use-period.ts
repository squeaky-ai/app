import React from 'react';
import type { TimePeriod } from 'types/common';

type ComponentType = 
  'dashboard' |
  'recordings' | 
  'heatmaps' | 
  'analytics' |
  'nps' |
  'sentiment' |
  'journeys' |
  'event-history';

interface UsePeriod {
  period: TimePeriod;
  setPeriod: (period: TimePeriod) => void;
}

const getDefaultFilters = (type: ComponentType) => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`period::${type}`);

    if (existing) {
      try {
        return JSON.parse(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'analytics':
    case 'recordings':
    case 'journeys':
    case 'event-history':
      return 'past_fourteen_days'; 
    case 'nps':
    case 'sentiment':
      return 'past_thirty_days';
    case 'dashboard':
      return 'past_year';
    default:
      return 'past_seven_days';
  }
};

export const usePeriod = (type: ComponentType): UsePeriod => {
  const [period, setPeriod] = React.useState<TimePeriod>(getDefaultFilters(type));

  const handlePeriodChange = (period: TimePeriod) => {
    setPeriod(period);
    sessionStorage.setItem(`period::${type}`, JSON.stringify(period));
  };

  return { period, setPeriod: handlePeriodChange };
};
