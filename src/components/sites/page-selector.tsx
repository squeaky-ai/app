import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';
import { Tooltip } from 'components/tooltip';
import { Radio } from 'components/radio';
import { Checkbox } from 'components/checkbox';
import { Search } from 'components/search';
import { buildNestedPagesStructure, PageTreeItem } from 'lib/page';
import type { SitesPage } from 'types/graphql';

export type PageSelectorType = 'single' | 'multi' | 'click';

interface Props {
  name?: string;
  label?: string;
  type: PageSelectorType;
  pages: SitesPage[];
  compact?: boolean;
  selected: string | string[] | null;
  setSelected?: (pages: SitesPage[]) => void;
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ItemProps {
  name?: string;
  type: PageSelectorType;
  page: SitesPage;
  selected: boolean;
  handleClick?: (page: SitesPage) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

enum Sort {
  AlphabeticalAsc = 'alphabetical__asc',
  AlphabeticalDesc = 'alphabetical__desc',
  CountAsc = 'count__asc',
  CountDesc = 'count__desc',
  Nested = 'nested',
}

export const PageSelector: FC<Props> = ({
  name,
  label,
  type,
  pages,
  compact,
  selected,
  handleClick,
  handleChange,
  setSelected,
}) => {
  const [sort, setSort] = React.useState<Sort>(Sort.CountDesc);
  const [search, setSearch] = React.useState<string>('');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Sort;
    setSort(value);
  };

  const isSelected = (page: SitesPage): boolean => {
    return Array.isArray(selected)
      ? selected.includes(page.url)
      : selected === page.url;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (handleChange) handleChange(event);
  };

  const results = [...pages]
    .sort((a, b) => {
      switch(sort) {
        case Sort.Nested:
        case Sort.AlphabeticalAsc:
          return a.url.localeCompare(b.url);
        case Sort.AlphabeticalDesc:
          return b.url.localeCompare(a.url);
        case Sort.CountAsc:
          return a.count - b.count;
        case Sort.CountDesc:
          return b.count - a.count;
      }
    })
    .filter(page => page.url.toLowerCase().includes(search.toLowerCase()));

  const buildSitePageFromPath = (item: PageTreeItem): SitesPage => {
    const match = results.find(r => r.url === item.path);

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

  const nestedPages = buildNestedPagesStructure(results);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(results)
      : setSelected([]);
  };

  const NestedItem: FC<{ page: PageTreeItem }> = ({ page }) => {
    const match: SitesPage = buildSitePageFromPath(page);

    return (
      <ul key={page.name}>
        <li>
          <ItemFactory 
            type={type}
            name={name}
            page={match}
            selected={isSelected(match)}
            handleChange={onChange}
            handleClick={handleClick}
          />
          {page.children.length > 0 && (
            <ul>
              {page.children.map(child => (
                <NestedItem key={child.name} page={child} />
              ))}
            </ul>
          )}
        </li>
      </ul>
    );
  };

  return (
    <div className={classnames('page-selector', type, { compact, 'no-results': results.length === 0 })}>
      <div className='selector-label'>
        <Label>
          {label || <>Select Page{type === 'multi' ? 's' : ''}</>}
        </Label>
        <Select value={sort} onChange={handleSortChange}>
          <Option value={Sort.AlphabeticalAsc}>Alphabetical: A-Z</Option>
          <Option value={Sort.AlphabeticalDesc}>Alphabetical: Z-A</Option>
          <Option value={Sort.CountDesc}>Count: High to Low</Option>
          <Option value={Sort.CountAsc}>Count: Low to High</Option>
          <Option value={Sort.Nested}>Nested</Option>
        </Select>
      </div>
      <Search 
        search={search}
        onSearch={setSearch}
      />
      <ul className='results'>
        {type === 'multi' && (
          <Checkbox
            className='item'
            checked={selected.length === pages.length && pages.length !== 0}
            partial={selected.length !== 0 && selected.length !== pages.length && pages.length !== 0}
            disabled={pages.length === 0}
            onChange={onSelectAll} 
          >
            <b>Select All</b>
          </Checkbox>
        )}

        {results.length === 0 && (
          <li className='item empty'>
            No results
          </li>
        )}

        {sort === Sort.Nested && (
          <>
            {nestedPages.map(page => (
              <NestedItem key={page.name} page={page} />
            ))}
          </>
        )}

        {sort !== Sort.Nested && (
          <>
            {results.map(result => (
              <li key={result.url}>
                <ItemFactory 
                  type={type}
                  name={name}
                  page={result}
                  selected={isSelected(result)}
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

const ItemFactory: FC<ItemProps> = ({ name, page, type, selected, handleChange, handleClick }) => (
  <>
    {type === 'click' && <ClickItem page={page} handleClick={handleClick} />}
    {type === 'single' && <SingleItem name={name || 'page'} page={page} selected={selected} handleChange={handleChange} />}
    {type === 'multi' && <MultiItem name={name || 'pages'} page={page} selected={selected} handleChange={handleChange} />}
  </>
);

const ClickItem: FC<{ 
  page: SitesPage,
  handleClick: (page: SitesPage) => void,
}> = ({ page, handleClick }) => (
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

const SingleItem: FC<{
  name: string;
  page: SitesPage,
  selected: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ name, page, selected, handleChange }) => (
  <Tooltip
    button={
      <Radio className='item' checked={selected} name={name} value={page.url} onChange={handleChange}>
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

const MultiItem: FC<{
  name: string; 
  page: SitesPage,
  selected: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ name, page, selected, handleChange }) => (
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
