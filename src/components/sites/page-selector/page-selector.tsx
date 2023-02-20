import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';
import { ItemFactory, PageSelectorType } from 'components/sites/page-selector/item-factory';
import { TreeItem } from 'components/sites/page-selector/tree-item';
import { Checkbox } from 'components/checkbox';
import { Search } from 'components/search';
import { buildNestedPagesStructure } from 'lib/page';
import { Preferences, Preference } from 'lib/preferences';
import type { SitesPage } from 'types/graphql';

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
    Preferences.setString(Preference.PAGE_SELECTOR_SORT, value);
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

  const nestedPages = buildNestedPagesStructure(results);

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(results)
      : setSelected([]);
  };

  React.useEffect(() => {
    const preference = Preferences.getString(Preference.PAGE_SELECTOR_SORT);

    if (preference) {
      setSort(preference as Sort);
    }
  }, []);

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
              <TreeItem 
                key={page.name}
                type={type}
                name={name}
                page={page}
                selected={selected}
                pages={results}
                handleChange={onChange}
                handleClick={handleClick}
              />
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
