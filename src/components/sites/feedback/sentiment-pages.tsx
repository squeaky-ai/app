import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { usePages } from 'hooks/use-pages';
import { Checkbox } from 'components/checkbox';

interface Props {
  value: string[];
  onChange: (event: React.ChangeEvent) => void;
}

export const SentimentPages: FC<Props> = ({ value, onChange }) => {
  const { loading, pages } = usePages();

  return (
    <div className='sentiment-pages'>
      {loading && <Spinner />}
      <div className='checkbox-group'>
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
  );
};
