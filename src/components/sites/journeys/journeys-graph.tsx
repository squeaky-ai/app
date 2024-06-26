import React from 'react';
import type { FC } from 'react';
import { range, sum } from 'lodash';
import { JourneysPage } from 'components/sites/journeys/journeys-page';
import { JourneysReferrers } from 'components/sites/journeys/journeys-referrers';
import { PathPosition, Site } from 'types/graphql';
import type { FocussedPage, PageStats } from 'types/journeys';
import type { AnalyticsUserPath } from 'types/graphql';

import {
  dimPage,
  getColumnTitle,
  getExitForColAndPage,
  getPagesForCol,
  hideUnpinnedPage,
} from 'lib/journeys';

interface Props {
  site: Site;
  position: PathPosition;
  journeys: AnalyticsUserPath[];
  setPage: (page: string) => void;
  setPosition: (position: PathPosition) => void;
}

export const JourneysGraph: FC<Props> = ({ site, position, journeys, setPage, setPosition }) => {
  const [showReferrers, setShowReferrers] = React.useState<boolean>(false);

  const [hoveredPage, setHoveredPage] = React.useState<FocussedPage>(null);
  const [pinnedPages, setPinnedPages] = React.useState<FocussedPage[]>([]);

  const [pinnedReferrer, setPinnedReferrer] = React.useState<string>(null);
  const [hoveredReferrer, setHoveredReferrer] = React.useState<string>(null);

  const columnCount = Math.max(...journeys.map(j => j.path.length));

  const handleMouseEnter = (col: number, page: PageStats) => {
    setHoveredPage({ col, page: page.path });
  };

  const handleMouseLeave = () => {
    setHoveredPage(null);
  };

  const gridTemplateColumns = showReferrers
    ? `repeat(${columnCount + 1}, 15rem)`
    : `3.125rem repeat(${columnCount + 1}, 15rem)`;

  return (
    <div className='journey-graph' style={{ gridTemplateColumns }}>
      <JourneysReferrers
        journeys={journeys}
        showReferrers={showReferrers}
        pinnedReferrer={pinnedReferrer}
        hoveredReferrer={hoveredReferrer}
        setPinnedReferrer={setPinnedReferrer}
        setHoveredReferrer={setHoveredReferrer}
        setShowReferrers={setShowReferrers}
      />
      
      {range(0, columnCount).map(column => {
        const pages = getPagesForCol(journeys, column);
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={column}>
            <p className='heading'>
              {getColumnTitle(column, columnCount, position)}
            </p>
            {pages.map(page => (
              <JourneysPage
                key={page.path + column}
                col={column}
                page={page}
                site={site}
                exits={getExitForColAndPage(journeys, column, page)}
                position={position}
                setPage={setPage}
                setPosition={setPosition}
                dim={dimPage(journeys, hoveredPage, hoveredReferrer, position, column, page)}
                hide={hideUnpinnedPage(journeys, pinnedPages, pinnedReferrer, position, column, page)}
                pinnedPages={pinnedPages}
                setPinnedPages={setPinnedPages}
                handleMouseEnter={() => handleMouseEnter(column, page)}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
            <div className='padder' style={{ height: `${padder}%` }} />
          </div>
        );
      })}
    </div>
  );
};
