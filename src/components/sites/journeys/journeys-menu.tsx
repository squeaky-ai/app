import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import type { Site } from 'types/graphql';
import type { PageStats } from 'types/journeys';

type ClickFunction = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface Props {
  open: boolean;
  site: Site;
  page: PageStats;
  pinned: boolean;
  pinDisabled: boolean;
  setOpen: (open: boolean) => void;
  handleStartPage: ClickFunction;
  handleEndPage: ClickFunction;
  handleViewRecordings: ClickFunction;
  togglePinned: VoidFunction;
}

export const JourneyMenu: FC<Props> = ({
  open,
  site,
  page,
  pinned,
  pinDisabled,
  setOpen,
  handleStartPage,
  handleEndPage,
  handleViewRecordings,
  togglePinned,
}) => {
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='menu'>
      <Button onClick={handleClick} className='open-menu'>
        <Icon name='more-2-fill' />
      </Button>

      {open && (
        <div className='page-actions dropdown-menu'>
          <Button onClick={togglePinned} disabled={pinDisabled}>
            {pinned ? 'Unpin' : 'Pin'} page
          </Button>
          <Button onClick={handleStartPage}>
            Set as start page
          </Button>
          <Button onClick={handleEndPage}>
            Set as end page
          </Button>
          <Button onClick={handleViewRecordings}>
            View recordings
          </Button>
          <a className='button primary' target='_blank' rel='noreferrer' href={`${site.url}${page.path}`}>
            Go to page
          </a>
        </div>
      )}
    </div>
  );
};
