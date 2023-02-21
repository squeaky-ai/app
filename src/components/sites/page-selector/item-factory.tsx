import React from 'react';
import type { FC } from 'react';
import { ClickItem } from 'components/sites/page-selector/click-item';
import { SingleItem } from 'components/sites/page-selector/single-item';
import { MultiItem } from 'components/sites/page-selector/multi-item';
import type { PageSelectorType, PageTreeItem } from 'types/pages';
import type { SitesPage } from 'types/graphql';

interface Props {
  name?: string;
  item?: PageTreeItem;
  type: PageSelectorType;
  page: SitesPage;
  selected: string | string[];
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiTreeChange?: (item: PageTreeItem) => void;
}

export const ItemFactory: FC<Props> = ({
  name,
  item,
  type,
  page,
  selected,
  handleChange,
  handleClick,
  handleMultiTreeChange,
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return item && handleMultiTreeChange && type === 'multi'
      ? handleMultiTreeChange(item)
      : handleChange(event);
  };

  const isSelected = (() => {
    if (!Array.isArray(selected)) {
      return selected === page.url;
    }

    if (selected.includes(page.url)) return true;

    if (!item) return false;

    return item.children.some(c => selected.includes(c.path)) 
      ? 'partial' 
      : false;
  })();

  return (
    <>
      {type === 'click' && (
        <ClickItem page={page} handleClick={handleClick} />
      )}

      {type === 'single' && (
        <SingleItem name={name || 'page'} page={page} handleChange={onChange} selected={isSelected} />
      )}

      {type === 'multi' && (
        <MultiItem name={name || 'pages'} page={page} handleChange={onChange} selected={isSelected} />
      )}
    </>
  );
};
