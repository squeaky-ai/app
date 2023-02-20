import React from 'react';
import type { FC } from 'react';
import { ItemFactory, PageSelectorType } from 'components/sites/page-selector/item-factory';
import type { PageTreeItem } from 'lib/page';
import type { SitesPage } from 'types/graphql';

interface Props {
  name: string;
  type: PageSelectorType;
  page: PageTreeItem;
  selected: string | string[] | null;
  pages: SitesPage[];
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const buildSitePageFromPath = (pages: SitesPage[], item: PageTreeItem): SitesPage => {
  const match = pages.find(p => p.url === item.path);

  if (item.children.length > 0) {
    // e.g.
    // name = 'blog'
    // path = 'blog/category/page'
    // Find where it occurs, add the length to get
    // the end of the relevant part
    const index = item.path.indexOf(item.name);
    const categoryPath = item.path.substring(0, index + item.name.length);

    return { 
      url: categoryPath,
      count: match.count || 0,
    };
  }

  return match;
};

export const TreeItem: FC<Props> = ({
  name,
  type,
  page,
  selected,
  pages,
  handleClick,
  handleChange,
}) => {
  const match: SitesPage = buildSitePageFromPath(pages, page);

  const isSelected = (page: SitesPage): boolean => {
    return Array.isArray(selected)
      ? selected.includes(page.url)
      : selected === page.url;
  };

  return (
    <ul key={page.name}>
      <li>
        <ItemFactory 
          type={type}
          name={name}
          page={match}
          selected={isSelected(match)}
          handleChange={handleChange}
          handleClick={handleClick}
        />
        {page.children.length > 0 && (
          <ul>
            {page.children.map(child => (
              <TreeItem
                key={child.name}
                type={type}
                name={name}
                page={child} 
                selected={selected}
                pages={pages}
                handleChange={handleChange}
                handleClick={handleClick}
              />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};
