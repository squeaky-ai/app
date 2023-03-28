import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { PageSelector } from 'components/sites/page-selector/page-selector';
import type { SitesPage } from 'types/graphql';

interface Props {
  page: string;
  pages: SitesPage[];
  setPage: (page: string) => void;
}

export const Pages: FC<Props> = ({ page, pages, setPage }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);

  const handleSelect = (page: SitesPage) => {
    setPage(page.url);
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
    <div className='analytics-pages'>
      <div ref={ref} className={classnames('page-dropdown', { open })}>
        <Button className='search-open' onClick={() => setOpen(!open)}>
          {page || <span className='no-page-selected'>No page selected</span>}
          <Icon name='arrow-drop-down-line' />
        </Button>

        <div className='search-popout'>
          <PageSelector
            type='click'
            selected={page}
            pages={pages}
            handleClick={handleSelect}
          />
        </div>
      </div>      
    </div>
  );
};
