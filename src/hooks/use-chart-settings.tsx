import React from 'react';
import { ScaleType } from 'recharts/types/util/types';
import type { ChartType } from 'types/charts';

type ChartSettingType =
  'admin-recordings-stored' |
  'admin-users-growth' |
  'admin-sites-growth' |
  'analytics-countries' |
  'analytics-visitors' |
  'analytics-page-views' |
  'analytics-visits-at' |
  'error-counts' |
  'event-counts' |
  'nps-replies' |
  'nps-score' |
  'sentiment-ratings';

interface State {
  type: ChartType;
  scale: ScaleType;
}

interface ChartSettings extends State {
  setType: (type: ChartType) => void;
  setScale: (scalle: ScaleType) => void;
}

const getDefaultSettings = (name: ChartSettingType): State => {
  switch(name) {
    case 'analytics-countries':
    case 'analytics-visits-at':
      return { scale: 'log', type: null };
    case 'event-counts':
      return { scale: 'auto', type: 'bar' };
    case 'admin-recordings-stored':
    case 'admin-sites-growth':
    case 'admin-users-growth':
    case 'analytics-page-views':
    case 'analytics-visitors':
    case 'error-counts':
      return { scale: 'auto', type: 'line' };
    default:
      return { scale: 'auto', type: 'line' };
  }
};

export const useChartSettings = (name: ChartSettingType): ChartSettings => {
  const [state, setState] = React.useState<State>(getDefaultSettings(name));

  const persist = (values: State) => {
    setState(values);

    localStorage.setItem(`chart-settings::${name}`, JSON.stringify({ 
      ...state,
      ...values,
    }));
  };

  const handleType = (type: ChartType) => persist({ ...state, type });

  const handleScale = (scale: ScaleType) => persist({ ...state, scale });

  React.useEffect(() => {
    const existing = localStorage.getItem(`chart-settings::${name}`);

    if (existing) {
      try {
        const values = JSON.parse(existing);
        setState(values);
      } catch {
        localStorage.removeItem(`chart-settings::${name}`);
      }
    }
  }, []);

  return { 
    ...state,
    setType: handleType,
    setScale: handleScale,
  };
};
