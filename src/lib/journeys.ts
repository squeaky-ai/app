import { countBy, sum } from 'lodash';
import { percentage } from 'lib/maths';
import { AnalyticsUserPath, PathPosition } from 'types/graphql';
import type { FocussedPage, PageStats } from 'types/journeys';

const getPageGroups = (
  journeys: AnalyticsUserPath[],
  col: number,
  includeEmpty: boolean,
) => {
  const pages = journeys.map(j => j.path[col]);
  const groups = countBy(pages);

  return Object
    .entries(groups)
    .filter(([key]) => includeEmpty ? true : key !== 'undefined');
};

const getTotalForCol = (
  journeys: AnalyticsUserPath[],
  col: number,
  includeEmpty: boolean,
) => {
  const groups = getPageGroups(journeys, col, includeEmpty);

  return sum(groups.map(([, value]) => value));
};

const pageAppearsInPinnedPath = (
  journeys: AnalyticsUserPath[],
  pinnedPages: FocussedPage[],
  col: number,
  page: PageStats,
) => {
  const routes = journeys
    .filter(j => j.path[col] === page.path)
    .filter(j => pinnedPages.every(p => j.path[p.col] === p.page ))

  return routes.length === 0;
};

const pageHasReferrer = (
  journeys: AnalyticsUserPath[],
  hoveredReferrer: string,
  col: number,
  page: PageStats,
) => {
  const referrer = hoveredReferrer === 'direct' ? null : hoveredReferrer;

  const routes = journeys
    .filter(j => j.path[col] === page.path)
    .filter(j => j.referrer === referrer);

  return routes.length === 0;
};

export const getPagesForCol = (
  journeys: AnalyticsUserPath[],
  col: number,
): PageStats[] => {
  const groups = getPageGroups(journeys, col, false);
  const total = getTotalForCol(journeys, col, true);

  return groups
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
  page: PageStats,
) => {
  const total = getTotalForCol(journeys, col, false);

  // Take a look at the next position in the depth to see if
  // people did not view anymore pages, as this means that they
  // dropped off here
  const exits = journeys
    .filter(j => j.path[col] === page.path)
    .map(j => j.path[col + 1])
    .filter(j => j === undefined).length;

  return percentage(total, exits);
};

export const dimPage = (
  journeys: AnalyticsUserPath[],
  hoveredPage: FocussedPage,
  hoveredReferrer: string | null,
  position: PathPosition,
  col: number,
  page: PageStats,
) => {
  if (!hoveredPage && hoveredReferrer) {
    // Special case where people can highlight the
    // traffic source without hovering over any
    // pages. This has to come first as it is the only
    // way to dim something without a hoveredPage
    return pageHasReferrer(journeys, hoveredReferrer, col, page);
  };

  // Nothing is selected
  if (!hoveredPage) return false;

  // Everything before has to be dimmed
  if (position === PathPosition.Start && hoveredPage.col > col) return true;
  if (position === PathPosition.End && hoveredPage.col < col) return true;

  // Everything else on this column has to be dimmed
  if (hoveredPage.col === col && hoveredPage.page !== page.path) return true;
  // This is the current column so it can't be dimmed
  if (hoveredPage.col === col && hoveredPage.page === page.path) return false;

  // TODO: if there is a pinned page this has to be aware!

  const routes = journeys
    .filter(j => j.path[col] === page.path)
    .filter(j => j.path[hoveredPage.col] === hoveredPage.page);

  return routes.length === 0;
};

export const hideUnpinnedPage = (
  journeys: AnalyticsUserPath[],
  pinnedPages: FocussedPage[],
  pineedReferrer: string | null,
  position: PathPosition,
  col: number,
  page: PageStats,
) => {
  if (pinnedPages.length === 0 && pineedReferrer) {
    // Special case where people can highlight the
    // traffic source without hovering over any
    // pages. This has to come first as it is the only
    // way to dim something without a hoveredPage
    return pageHasReferrer(journeys, pineedReferrer, col, page);
  };

  // Nothing is selected
  if (pinnedPages.length === 0) return false;

  const firstPin = [...pinnedPages].sort((a, b) => position === PathPosition.Start
    ? a.col - b.col
    : b.col - a.col
  )[0];

  // Anything before the first pinned columns should
  // not be hidden or the entire column will be empty
  if (position === PathPosition.Start && firstPin.col > col) return false;
  if (position === PathPosition.End && firstPin.col < col) return false;

  // Only one pin per column is allowed so hide everything
  // that is not the pinned for that column
  if (firstPin.col === col && firstPin.page !== page.path) return true;

  return pageAppearsInPinnedPath(journeys, pinnedPages, col, page);
};

export const getColumnTitle = (
  col: number,
  position: PathPosition,
) => {
  if (position === PathPosition.Start) {
    return col === 0
      ? 'Start'
      : `Page ${col}`;
  }

  return col === 0
    ? 'End'
    : `End - ${col}`;
};
