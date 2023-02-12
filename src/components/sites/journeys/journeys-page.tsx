import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Tooltip } from 'components/tooltip';
import { JourneyMenu } from 'components/sites/journeys/journeys-menu';
import { useFilters } from 'hooks/use-filters';
import { PathPosition, Site } from 'types/graphql';
import { FILTERS } from 'data/recordings/constants';
import type { PageStats, FocussedPage } from 'types/journeys';
import type { RecordingsFilters } from 'types/graphql';
import { Button } from 'components/button';

interface Props {
  col: number;
  dim: boolean;
  site: Site;
  page: PageStats;
  exits: number;
  position: PathPosition;
  pinnedPages: FocussedPage[];
  setPage: (page: string) => void;
  setPosition: (position: PathPosition) => void;
  setPinnedPages: (pages: FocussedPage[]) => void;
  handleMouseEnter: VoidFunction;
  handleMouseLeave: VoidFunction;
}

export const JourneysPage: FC<Props> = ({
  col, 
  dim,
  site,
  page, 
  position,
  exits, 
  pinnedPages,
  setPage, 
  setPosition,
  setPinnedPages,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { setFilters } = useFilters<RecordingsFilters>('recordings');

  const [open, setOpen] = React.useState<boolean>(false);

  const isPinned = !!pinnedPages.find(p => p.col === col && p.page === page.path);

  const handleClose = (event: MouseEvent) => {
    const element = event.target as Element;

    if (ref.current && !ref.current.contains(element)) {
      setOpen(false);
    }
  };

  const handleStartPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setOpen(false);
    setPage(page.path);
    setPosition(PathPosition.Start);
  };

  const handleEndPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setOpen(false);
    setPage(page.path);
    setPosition(PathPosition.End);
  };

  const handleViewRecordings = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setOpen(false);

    setFilters({ ...FILTERS, visitedPages: [page.path] });
    await router.push(`/sites/${router.query.site_id}/recordings`);
  };

  const togglePinnedPage = () => {
    setPinnedPages(
      isPinned
        ? pinnedPages.filter(p => p.col !== col && p.page !== page.path)
        : [...pinnedPages, { col, page: page.path }]
    );
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose, true);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classnames('page', { 'has-exit': exits > 0, dim })} 
      key={col + page.path} 
      style={{ height: `${page.percentage}%` }}
    >
      {isPinned && (
        <Button className='pin' onClick={togglePinnedPage}>
          <Icon name='pushpin-line' />
        </Button>
      )}
      <div className='row'>
        <Tooltip fluid buttonClassName='path' button={
          <>
            <Icon name='file-line' />
            {page.path}
          </>
        }>
          {page.path}
        </Tooltip>
        <JourneyMenu 
          open={open}
          site={site}
          page={page}
          pinned={isPinned}
          setOpen={setOpen}
          handleStartPage={handleStartPage}
          handleEndPage={handleEndPage}
          handleViewRecordings={handleViewRecordings}
          togglePinned={togglePinnedPage}
        />
      </div>
      <div className='row'>
        <Pill className='stats'>
          {page.percentage}%
        </Pill>
        {exits > 0 && position !== PathPosition.End && (
          <Tooltip fluid button={
            <Pill className='drop-off'>
              <Icon name='arrow-right-down-line' />
              {exits}%
            </Pill>
          }>Drop-off rate from this page</Tooltip>
        )}
      </div>
    </div>
  );
};
