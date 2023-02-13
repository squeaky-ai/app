import React from 'react';
import type { FC } from 'react';
import { range, sum } from 'lodash';
import { JourneysPage } from 'components/sites/journeys/journeys-page';
import { PathPosition, Site } from 'types/graphql';
import type { FocussedPage } from 'types/journeys';
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
  const [hoveredPage, setHoveredPage] = React.useState<FocussedPage>(null);
  const [pinnedPages, setPinnedPages] = React.useState<FocussedPage[]>([]);

  const columnCount = Math.max(...journeys.map(j => j.path.length));

  const handleMouseEnter = (col: number, page: string) => {
    setHoveredPage({ col, page });
  };

  const handleMouseLeave = () => {
    setHoveredPage(null);
  };

  return (
    <div className='journey-graph' style={{ gridTemplateColumns: `repeat(${columnCount}, 15rem)` }}>
      {range(0, columnCount).map(col => {
        const pages = getPagesForCol(journeys, col);
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={col}>
            <p className='heading'>
              {getColumnTitle(col, columnCount, position)}
            </p>
            {pages.map(page => (
              <JourneysPage
                key={page.path + col}
                col={col}
                page={page}
                site={site}
                exits={getExitForColAndPage(journeys, col, page.path)}
                position={position}
                setPage={setPage}
                setPosition={setPosition}
                dim={dimPage(journeys, hoveredPage, col, page.path)}
                hide={hideUnpinnedPage(journeys, pinnedPages, col, page.path)}
                pinnedPages={pinnedPages}
                setPinnedPages={setPinnedPages}
                handleMouseEnter={() => handleMouseEnter(col, page.path)}
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
