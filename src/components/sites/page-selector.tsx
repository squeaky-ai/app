import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';
import { Button } from 'components/button';
import { Radio } from 'components/radio';
import { Checkbox } from 'components/checkbox';
import { Search } from 'components/search';
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

enum Sort {
  AlphabeticalAsc = 'alphabetical__asc',
  AlphabeticalDesc = 'alphabetical__desc',
  CountAsc = 'count__asc',
  CountDesc = 'count__desc',
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

  const results = [...pages]
    .sort((a, b) => {
      switch(sort) {
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

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(results)
      : setSelected([]);
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

        {results.map(result => (
          <li key={result.url}>
            {type === 'click' && <ClickItem page={result} handleClick={handleClick} />}
            {type === 'single' && <SingleItem name={name || 'page'} page={result} selected={isSelected(result)} handleChange={handleChange} />}
            {type === 'multi' && <MultiItem name={name || 'pages'} page={result} selected={isSelected(result)} handleChange={handleChange} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ClickItem: FC<{ 
  page: SitesPage,
  handleClick: (page: SitesPage) => void,
}> = ({ page, handleClick }) => (
  <Button className='item' onClick={() => handleClick(page)}>
    <span className='url'>{page.url}</span>
    <span className='count'>{page.count.toLocaleString()}</span>
  </Button>
);

const SingleItem: FC<{
  name: string;
  page: SitesPage,
  selected: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ name, page, selected, handleChange }) => (
  <Radio className='item' checked={selected} name={name} value={page.url} onChange={handleChange}>
    <span className='url'>{page.url}</span>
    <span className='count'>{page.count.toLocaleString()}</span>
  </Radio>
);

const MultiItem: FC<{
  name: string; 
  page: SitesPage,
  selected: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ name, page, selected, handleChange }) => (
  <Checkbox className='item' checked={selected} name={name} value={page.url} onChange={handleChange}>
    <span className='url'>{page.url}</span>
    <span className='count'>{page.count.toLocaleString()}</span>
  </Checkbox>
);
