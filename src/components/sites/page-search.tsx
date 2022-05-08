import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Search } from 'components/search';

interface Props {
  page: string;
  pages: string[];
  setPage: (page: string) => void;
}

export const PageSearch: FC<Props> = ({ page, pages, setPage }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');

  const results = pages.filter(page => search 
    ? page.toLowerCase().includes(search.toLowerCase())
    : true
  );

  const handleSelect = (page: string) => {
    setPage(page);
    setOpen(false);
  };

  const handleBodyClick = (event: MouseEvent) => {
    const element = event.target as HTMLElement;

    if (ref.current && !ref.current.contains(element)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleBodyClick);

    return () => {
      document.removeEventListener('click', handleBodyClick, true);
    };
  }, []);

  return (
    <div ref={ref} className={classnames('page-search', { open })}>
      <Button className='search-open' onClick={() => setOpen(!open)}>
        {page}
        <Icon name='arrow-drop-down-line' />
      </Button>

      <div className='search-popout'>
        <Search 
          search={search}
          onSearch={setSearch}
        />

        <div className='results'>
          {results.map(page => (
            <Button key={page} onClick={() => handleSelect(page)}>
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
