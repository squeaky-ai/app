import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Radio } from 'components/radio';
import type { SitesPage } from 'types/graphql';

interface Props {
  name: string;
  page: SitesPage;
  selected: boolean | 'partial';
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SingleItem: FC<Props> = ({
  name,
  page,
  selected,
  handleChange
}) => (
  <Tooltip
    button={
      <Radio className='item' checked={selected === true} name={name} value={page.url} onChange={handleChange}>
        <span className='url'>{page.url}</span>
        <span className='count'>{page.count.toLocaleString()}</span>
      </Radio>
    }
    buttonProps={{ 
      type: 'button',
    }}
    portalClassName='page-selector-tooltip'
  >
    {page.url}
  </Tooltip>
);
