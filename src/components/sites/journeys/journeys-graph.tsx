import React from 'react';
import type { FC } from 'react';
import { range, countBy, sum } from 'lodash';
import { JourneysPage } from 'components/sites/journeys/journeys-page';
import { percentage } from 'lib/maths';
import { PathPosition } from 'types/graphql';
import type { PageStats, HoveredPage } from 'types/journeys';
import type { AnalyticsUserPath } from 'types/graphql';

interface Props {
  depth: number;
  position: PathPosition;
  journeys: AnalyticsUserPath[];
  setPage: (page: string) => void;
  setPosition: (position: PathPosition) => void;
}

export const JourneysGraph: FC<Props> = ({ depth, position, journeys, setPage, setPosition }) => {
  const [hoveredPage, setHoveredPage] = React.useState<HoveredPage>(null);

  const maxDepth = Math.max(...journeys.map(j => j.path.length));

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

  const dimPage = (col: number, page: string) => {
    // Nothing is selected
    if (!hoveredPage) return false;
    // Everything before has to be dimmed
    if (hoveredPage.col > col) return true;
    // Everything else on this column has to be dimmed
    if (hoveredPage.col === col && hoveredPage.page !== page) return true;
    // This is the current column so it can't be dimmed
    if (hoveredPage.col === col && hoveredPage.page === page) return false;

    const routes = journeys
      .filter(j => j.path[hoveredPage.col] === hoveredPage.page)

    return !routes.some(r => r.path[col] === page);
  };

  const handleMouseEnter = (col: number, page: string) => {
    setHoveredPage({ col, page });
  };

  const handleMouseLeave = () => {
    setHoveredPage(null);
  };

  const columnCount = depth === -1 ? maxDepth : depth;

  return (
    <div className='journey-graph' style={{ gridTemplateColumns: `repeat(${columnCount}, 15rem)` }}>
      {range(0, columnCount).map(col => {
        const pages = getPagesForCol(col);
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={col}>
            <p className='heading'>Page {col + 1}</p>
            {pages.map(page => (
              <JourneysPage
                key={page.path + col}
                col={col}
                page={page}
                exits={getExitForColAndPage(col, page.path)}
                position={position}
                setPage={setPage}
                setPosition={setPosition}
                dim={dimPage(col, page.path)}
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
