import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Tooltip } from 'components/tooltip';
import { Button } from 'components/button';
import { useFilters } from 'hooks/use-filters';
import { PathPosition } from 'types/graphql';
import { FILTERS } from 'data/recordings/constants';
import type { PageStats } from 'types/journeys';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  col: number;
  page: PageStats;
  exits: number;
  position: PathPosition;
  setPage: (page: string) => void;
  setPosition: (position: PathPosition) => void;
}

type Coords = [number, number];

export const JourneysPage: FC<Props> = ({ col, page, position, exits, setPage, setPosition }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { setFilters } = useFilters<RecordingsFilters>('recordings');

  const [open, setOpen] = React.useState<boolean>(false);
  const [clickedAt, setClickedAt] = React.useState<Coords>([0, 0]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    setClickedAt([clientX, clientY]);
    setOpen(true);
  };

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

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose, true);
    };
  }, []);

  return (
    <div ref={ref} onClick={handleClick} className={classnames('page', { 'has-exit': exits > 0 })} key={col + page.path} style={{ height: `${page.percentage}%` }}>
      <div className='row'>
        <Tooltip fluid buttonClassName='path' button={
          <>
            <Icon name='file-line' />
            {page.path}
          </>
        }>
          {page.path}
        </Tooltip>
        <p className='stats'>
          {page.percentage}%
        </p>
      </div>
      {exits > 0 && position !== PathPosition.End && (
        <div className='row'>
          <Pill className='drop-off'>
            <Icon name='arrow-right-down-line' />
            {exits}%
          </Pill>
        </div>
      )}

      {open && (
        <div className='page-actions dropdown-menu' style={{ left: clickedAt[0], top: clickedAt[1] }}>
          <Button onClick={handleStartPage}>
            Set as start page
          </Button>
          <Button onClick={handleEndPage}>
            Set as end page
          </Button>
          <Button onClick={handleViewRecordings}>
            View recordings
          </Button>
        </div>
      )}
    </div>
  );
};
