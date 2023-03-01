import React from 'react';
import type { FC } from 'react';
import { debounce } from 'lodash';
import { Input } from 'components/input';
import { Icon } from 'components/icon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  search: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const Search: FC<Props> = ({ search, placeholder, onSearch, ...rest }) => {
  const [val, setVal] = React.useState<string>(search);

  const setValue = React.useCallback(debounce((value: string) => {
    onSearch(value);
  }, 250), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div className='search-input'>
      <Input 
        type='search' 
        placeholder={placeholder || 'Search ...'}
        name='search'
        value={val}
        onChange={handleChange}
        autoComplete='off'
        {...rest}
      />
      <Icon name='search-line' />
    </div>
  );
};
