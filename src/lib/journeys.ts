import { countBy, sum } from 'lodash';
import { percentage } from 'lib/maths';
import { AnalyticsUserPath, PathPosition } from 'types/graphql';
import type { FocussedPage, PageStats } from 'types/journeys';

const getTotalForCol = (
  journeys: AnalyticsUserPath[],
  col: number,
  includeEmpty: boolean
) => {
  const pages = journeys.map(j => j.path[col]);
  const groups = countBy(pages);

  return sum(
    Object
      .entries(groups)
      .filter(([key]) => includeEmpty ? true : key !== 'undefined')
      .map(([, value]) => value)
  );
};

const pageAppearsInPinnedPath = (
  journeys: AnalyticsUserPath[],
  pinnedPages: FocussedPage[],
  col: number,
  page: string
) => {
  const routes = journeys
    .filter(j => pinnedPages.every(p => j.path[p.col] === p.page ))

  return !routes.some(r => r.path[col] === page);
};


export const getPagesForCol = (
  journeys: AnalyticsUserPath[],
  col: number
): PageStats[] => {
  const pages = journeys.map(j => j.path[col]);
  const groups = countBy(pages);
  const total = getTotalForCol(journeys, col, true);

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

export const getExitForColAndPage = (
  journeys: AnalyticsUserPath[],
  col: number,
  page: string
) => {
  const total = getTotalForCol(journeys, col, false);

  // Take a look at the next position in the depth to see if
  // people did not view anymore pages, as this means that they
  // dropped off here
  const exits = journeys
    .filter(j => j.path[col] === page)
    .map(j => j.path[col + 1])
    .filter(j => j === undefined).length;

  return percentage(total, exits);
};

export const dimPage = (
  journeys: AnalyticsUserPath[],
  hoveredPage: FocussedPage,
  col: number,
  page: string
) => {
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

export const hideUnpinnedPage = (
  journeys: AnalyticsUserPath[],
  pinnedPages: FocussedPage[],
  col: number,
  page: string
) => {
  // Nothing is selected
  if (pinnedPages.length === 0) return false;

  const firstPin = [...pinnedPages].sort((a, b) => a.col - b.col)[0];
  // Anything before the first pinned columns should
  // not be hidden or the entire column will be empty
  if (firstPin.col > col) return false;
  // Only one pin per column is allowed so hide everything
  // that is not the pinned for that column
  if (firstPin.col === col && firstPin.page !== page) return true;

  return pageAppearsInPinnedPath(journeys, pinnedPages, col, page);
};

export const getColumnTitle = (
  col: number,
  columnCount: number,
  position: PathPosition
) => {
  if (col === 0 && position === PathPosition.Start) return 'Start';
  if (col === columnCount - 1 && position === PathPosition.End) return 'End';

  return `Page ${col + 1}`;
};
