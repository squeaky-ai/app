import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
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
      <p>To ensure all pages on your site or web app are listed, please make sure you have generated a recording that visits every page of your site.</p>
      <Link href='#'>
        <a>Learn more</a>
      </Link>
      </div>
    </div>
  );
};
