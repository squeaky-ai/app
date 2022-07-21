import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { usePages } from 'hooks/use-pages';
import { Checkbox } from 'components/checkbox';

interface Props {
  value: string[];
  onChange: (event: React.ChangeEvent) => void;
}

export const NpsPages: FC<Props> = ({ value, onChange }) => {
  const { loading, pages } = usePages();

  return (
    <div className='nps-pages-wrapper'>
      <div className='nps-pages'>
        {loading && <Spinner />}
        <div className='checkbox-group'>
          {pages.map(page => (
            <Checkbox 
              name='npsExcludedPages' 
              key={page} 
              checked={value.includes(page)} 
              onChange={onChange}
              value={page}
            >
              {page}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className='nps-hint'>
        <p>The pages list only shows pages that have appeared in a session recording captured by Squeaky.</p>
        <p>To ensure all pages on your site are listed, please make sure you have generated a recording that visits every page of your site.</p>
      </div>
    </div>
  );
};
