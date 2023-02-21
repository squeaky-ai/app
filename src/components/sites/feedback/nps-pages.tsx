import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { usePages } from 'hooks/use-pages';
import { PageSelector } from 'components/sites/page-selector/page-selector';
import { getDateRange } from 'lib/dates';

interface Props {
  value: string[];
  onChange: (event: React.ChangeEvent) => void;
  setSelected: (pages: string[]) => void;
}

export const NpsPages: FC<Props> = ({ value, onChange, setSelected }) => {
  const { loading, pages } = usePages({ 
    range: getDateRange('past_year'),
  });

  return (
    <div className='nps-pages-wrapper'>
      <div className='nps-pages'>
        {loading && <Spinner />}
        <PageSelector
          name='npsExcludedPages'
          type='multi'
          pages={pages}
          selected={value}
          handleChange={onChange}
          setSelected={setSelected}
        />
      </div>
      <div className='nps-hint'>
        <p>The pages list only shows pages that have appeared in a session recording captured by Squeaky.</p>
        <p>To ensure all pages on your site are listed, please make sure you have generated a recording that visits every page of your site.</p>
      </div>
    </div>
  );
};
