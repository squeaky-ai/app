import React from 'react';
import type { FC } from 'react';
import { range, countBy, sum } from 'lodash';
import { JourneysPage } from 'components/sites/journeys/journeys-page';
import { percentage } from 'lib/maths';
import { PathPosition, Site } from 'types/graphql';
import type { PageStats, FocussedPage } from 'types/journeys';
import type { AnalyticsUserPath } from 'types/graphql';

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

  const getTotalForCol = (col: number, includeEmpty: boolean) => {
    const pages = journeys.map(j => j.path[col]);
    const groups = countBy(pages);

    return sum(
      Object
        .entries(groups)
        .filter(([key]) => includeEmpty ? true : key !== 'undefined')
        .map(([, value]) => value)
    );
  };

  const getPagesForCol = (col: number): PageStats[] => {
    const pages = journeys.map(j => j.path[col]);
    const groups = countBy(pages);
    const total = getTotalForCol(col, true);

    return Object
      .entries(groups)
      .filter(([key]) => key !== 'undefined')
      .map(([key, value]) => ({
        path: key,
        count: value,
        percentage: percentage(total, value),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getExitForColAndPage = (col: number, page: string) => {
    const total = getTotalForCol(col, false);

    // Take a look at the next position in the depth to see if
    // people did not view anymore pages, as this means that they
    // dropped off here
    const exits = journeys
      .filter(j => j.path[col] === page)
      .map(j => j.path[col + 1])
      .filter(j => j === undefined).length;

    return percentage(total, exits);
  };

  const pageAppearsInPinnedPath = (col: number, page: string) => {
    const routes = journeys
      .filter(j => pinnedPages.every(p => j.path[p.col] === p.page ))

    return !routes.some(r => r.path[col] === page);
  };

  const dimPage = (col: number, page: string) => {
    // Nothing is selected
    if (!hoveredPage) return false;
    // Everything before has to be dimmed
    if (hoveredPage.col > col) return true;
    // Everything else on this column has to be dimmed
    if (hoveredPage.col === col && hoveredPage.page !== page) return true;
    // This is the current column so it can't be dimmed
    if (hoveredPage.col === col && hoveredPage.page === page) return false;

    // TODO: if there is a pinned page this has to be aware!

    const routes = journeys
      .filter(j => j.path[hoveredPage.col] === hoveredPage.page);

    return !routes.some(r => r.path[col] === page);
  };

  const hideUnpinnedPage = (col: number, page: string) => {
    // Nothing is selected
    if (pinnedPages.length === 0) return false;

    const firstPin = [...pinnedPages].sort((a, b) => a.col - b.col)[0];
    // Anything before the first pinned columns should
    // not be hidden or the entire column will be empty
    if (firstPin.col > col) return false;
    // Only one pin per column is allowed so hide everything
    // that is not the pinned for that column
    if (firstPin.col === col && firstPin.page !== page) return true;

    return pageAppearsInPinnedPath(col, page);
  };

  const handleMouseEnter = (col: number, page: string) => {
    setHoveredPage({ col, page });
  };

  const handleMouseLeave = () => {
    setHoveredPage(null);
  };

  const getColumnTitle = (col: number) => {
    if (col === 0 && position === PathPosition.Start) return 'Start';
    if (col === 0 && position === PathPosition.End) return 'End';

    return `Page ${col + 1}`;
  };

  return (
    <div className='journey-graph' style={{ gridTemplateColumns: `repeat(${columnCount}, 15rem)` }}>
      {range(0, columnCount).map(col => {
        const pages = getPagesForCol(col);
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={col}>
            <p className='heading'>
              {getColumnTitle(col)}
            </p>
            {pages.map(page => (
              <JourneysPage
                key={page.path + col}
                col={col}
                page={page}
                site={site}
                exits={getExitForColAndPage(col, page.path)}
                position={position}
                setPage={setPage}
                setPosition={setPosition}
                dim={dimPage(col, page.path)}
                hide={hideUnpinnedPage(col, page.path)}
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
