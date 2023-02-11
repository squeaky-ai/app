import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import type { Site } from 'types/graphql';
import type { PageStats } from 'types/journeys';

type ClickFunction = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface Props {
  open: boolean;
  site: Site;
  page: PageStats;
  setOpen: (open: boolean) => void;
  handleStartPage: ClickFunction;
  handleEndPage: ClickFunction;
  handleViewRecordings: ClickFunction;
}

export const JourneyMenu: FC<Props> = ({
  open,
  site,
  page,
  setOpen,
  handleStartPage,
  handleEndPage,
  handleViewRecordings,
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
          <Button onClick={handleStartPage}>
            Set as start page
          </Button>
          <Button onClick={handleEndPage}>
            Set as end page
          </Button>
          <Button onClick={handleViewRecordings}>
            View recordings
          </Button>
          <Link className='button primary' href={`/sites/${site.id}/analytics/page/traffic?url=${encodeURIComponent(page.path)}`}>
            Go to page
          </Link>
        </div>
      )}
    </div>
  )
};
