import React from 'react';
import type { FC } from 'react';
import { ItemFactory } from 'components/sites/page-selector/item-factory';
import type { PageSelectorType, PageTreeItem } from 'types/pages';
import type { SitesPage } from 'types/graphql';

interface Props {
  name: string;
  type: PageSelectorType;
  page: PageTreeItem;
  pages: SitesPage[];
  selected: string | string[];
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiTreeChange?: (item: PageTreeItem) => void;
}

const buildSitePageFromPath = (
  pages: SitesPage[],
  item: PageTreeItem,
): SitesPage => {
  // Get the matching page from the tree, or create a fake
  // page with defaults
  const match = pages.find(p => p.url === item.path) || { 
    count: 0,
    url: item.path
  };

  return match;
};

export const TreeItem: FC<Props> = ({
  name,
  type,
  page,
  pages,
  selected,
  handleClick,
  handleChange,
  handleMultiTreeChange,
}) => {
  const match: SitesPage = buildSitePageFromPath(pages, page);

  return (
    <ul key={page.name}>
      <li>
        <ItemFactory 
          type={type}
          item={page}
          name={name}
          page={match}
          selected={selected}
          handleClick={handleClick}
          handleChange={handleChange}
          handleMultiTreeChange={handleMultiTreeChange}
        />
        {page.children.length > 0 && (
          <ul>
            {page.children.map(child => (
              <TreeItem
                key={child.name}
                type={type}
                name={name}
                page={child} 
                pages={pages}
                selected={selected}
                handleClick={handleClick}
                handleChange={handleChange}
                handleMultiTreeChange={handleMultiTreeChange}
              />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};
