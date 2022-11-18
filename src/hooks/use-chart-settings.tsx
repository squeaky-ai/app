import React from 'react';
import { ScaleType } from 'recharts/types/util/types';
import type { ChartType } from 'types/charts';

type ChartSettingType =
  'admin-recordings-stored' |
  'admin-users-growth' |
  'admin-sites-growth' |
  'analytics-visitors' |
  'analytics-page-views' |
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

export const useChartSettings = (name: ChartSettingType): ChartSettings => {
  const [state, setState] = React.useState<State>({
    type: 'line',
    scale: 'auto',
  });

  const persist = (values: State) => {
    setState(values);

    sessionStorage.setItem(`chart-settings::${name}`, JSON.stringify({ 
      ...state,
      ...values,
    }));
  };

  const handleType = (type: ChartType) => persist({ ...state, type });

  const handleScale = (scale: ScaleType) => persist({ ...state, scale });

  React.useEffect(() => {
    const existing = sessionStorage.getItem(`chart-settings::${name}`);

    if (existing) {
      try {
        const values = JSON.parse(existing);
        setState(values);
      } catch {}
    }
  }, []);

  return { 
    ...state,
    setType: handleType,
    setScale: handleScale,
  };
};
