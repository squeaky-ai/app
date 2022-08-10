import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { usePages } from 'hooks/use-pages';
import { Checkbox } from 'components/checkbox';

interface Props {
  value: string[];
  onChange: (event: React.ChangeEvent) => void;
  setSelected: (pages: string[]) => void;
}

export const SentimentPages: FC<Props> = ({ value, onChange, setSelected }) => {
  const { loading, pages } = usePages();

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(pages)
      : setSelected([]);
  };

  return (
    <div className='sentiment-pages-wrapper'>
      <div className='sentiment-pages'>
        {loading && <Spinner />}
        <div className='checkbox-group'>
          <Checkbox
            checked={value.length === pages.length && pages.length !== 0}
            partial={value.length !== 0 && value.length !== pages.length && pages.length !== 0}
            disabled={pages.length === 0}
            onChange={onSelectAll} 
          >
            <b>Select All</b>
          </Checkbox>
          {pages.map(page => (
            <Checkbox 
              name='sentimentExcludedPages' 
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
      <div className='sentiment-hint'>
        <p>The pages list only shows pages that have appeared in a session recording captured by Squeaky.</p>
        <p>To ensure all pages on your site are listed, please make sure you have generated a recording that visits every page of your site.</p>
      </div>
    </div>
  );
};
