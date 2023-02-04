import React from 'react';

type ChartSettingType =
  'admin-sites-growth' |
  'analytics-visitors';

interface UseChartShow {
  show: string[];
  setShow: (show: string[]) => void;
}

const getDefaultSettings = (name: ChartSettingType): string[] => {
  switch(name) {
    case 'admin-sites-growth':
      return ['all', 'verified', 'unverified'];
    case 'analytics-visitors':
      return ['all', 'existing', 'new'];
    default:
      return [];
  }
};

export const useChartShow = (name: ChartSettingType): UseChartShow => {
  const [show, setShow] = React.useState<string[]>(getDefaultSettings(name));

  const persist = (values: string[]) => {
    setShow(values);

    localStorage.setItem(`chart-show::${name}`, values.join(','));
  };

  React.useEffect(() => {
    const existing = localStorage.getItem(`chart-show::${name}`);

    if (existing) {
      try {
        const values = existing.split(',');
        setShow(values);
      } catch {
        localStorage.removeItem(`chart-show::${name}`);
      }
    }
  }, []);

  return { 
    show,
    setShow: persist,
  };
};
