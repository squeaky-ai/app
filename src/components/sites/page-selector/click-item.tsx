import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import type { SitesPage } from 'types/graphql';

interface Props {
  page: SitesPage;
  handleClick?: (page: SitesPage) => void;
}

export const ClickItem: FC<Props> = ({ page, handleClick }) => (
  <Tooltip
    button={
      <>
        <span className='url'>{page.url}</span>
        <span className='count'>{page.count.toLocaleString()}</span>
      </>
    }
    buttonProps={{ 
      type: 'button',
    }}
    buttonClassName='item'
    buttonOnClick={() => handleClick(page)}
    portalClassName='page-selector-tooltip'
  >
    {page.url}
  </Tooltip>
);
