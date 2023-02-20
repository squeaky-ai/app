import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Checkbox } from 'components/checkbox';
import type { SitesPage } from 'types/graphql';

interface Props {
  name: string; 
  page: SitesPage;
  selected: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MultiItem: FC<Props> = ({
  name,
  page,
  selected,
  handleChange,
}) => (
  <Tooltip
    button={
      <Checkbox className='item' checked={selected} name={name} value={page.url} onChange={handleChange}>
        <span className='url'>{page.url}</span>
        <span className='count'>{page.count.toLocaleString()}</span>
      </Checkbox>
    }
    buttonProps={{ 
      type: 'button',
    }}
    portalClassName='page-selector-tooltip'
  >
    {page.url}
  </Tooltip>
);
