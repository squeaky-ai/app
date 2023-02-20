import React from 'react';
import type { FC } from 'react';
import { ClickItem } from 'components/sites/page-selector/click-item';
import { SingleItem } from 'components/sites/page-selector/single-item';
import { MultiItem } from 'components/sites/page-selector/multi-item';
import type { SitesPage } from 'types/graphql';

export type PageSelectorType = 'single' | 'multi' | 'click';

interface Props {
  name?: string;
  type: PageSelectorType;
  page: SitesPage;
  selected: boolean;
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ItemFactory: FC<Props> = ({
  name,
  type,
  page,
  selected,
  handleChange,
  handleClick,
}) => (
  <>
    {type === 'click' && <ClickItem page={page} handleClick={handleClick} />}
    {type === 'single' && <SingleItem name={name || 'page'} page={page} selected={selected} handleChange={handleChange} />}
    {type === 'multi' && <MultiItem name={name || 'pages'} page={page} selected={selected} handleChange={handleChange} />}
  </>
);
