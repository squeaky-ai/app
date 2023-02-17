import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { uniq } from 'lodash';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { JourneyReferrersPage } from 'components/sites/journeys/journeys-referrers-page';
import { percentage } from 'lib/maths';
import type { JourneyReferrer } from 'types/journeys';
import type { AnalyticsUserPath } from 'types/graphql';

interface Props {
  journeys: AnalyticsUserPath[];
  showReferrers: boolean;
  pinnedReferrer: string | null;
  hoveredReferrer: string | null;
  setHoveredReferrer: (referrer: string | null) => void;
  setPinnedReferrer: (referrer: string | null) => void;
  setShowReferrers: (show: boolean) => void;
}

export const JourneysReferrers: FC<Props> = ({
  journeys,
  showReferrers,
  pinnedReferrer,
  hoveredReferrer,
  setHoveredReferrer,
  setPinnedReferrer,
  setShowReferrers,
}) => {
  const toggleOpen = () => setShowReferrers(!showReferrers);

  const referrers = uniq(journeys.map(j => j.referrer));

  const getPercentageForReferrer = (referrer?: string) => percentage(
    journeys.length,
    journeys.filter(j => j.referrer === referrer).length
  );

  const results: JourneyReferrer[] = referrers
    .map(referrer => ({
      name: referrer || 'direct',
      title: referrer || <>Direct <i>(None/Unknown)</i></>,
      percentage: getPercentageForReferrer(referrer),
      direct: !referrer,
    }))
    .sort((a, b) => Number(b.percentage) - Number(a.percentage));

  return (
    <div className={classnames('col referrers', { open: showReferrers })}>
      <Button className='open' onClick={toggleOpen}>
        <Icon name='arrow-right-s-line' />
        <Icon name='arrow-right-s-line' />
      </Button>
      <Button className='close' onClick={toggleOpen}>
        <Icon name='close-line' />
      </Button>
      <p className='heading'>
        Traffic Sources
      </p>
      {results.map(r => (
        <JourneyReferrersPage
          key={r.name}
          hoveredReferrer={hoveredReferrer}
          pinnedReferrer={pinnedReferrer}
          referrer={r}
          setHoveredReferrer={setHoveredReferrer}
          setPinnedReferrer={setPinnedReferrer}
        />
      ))}
    </div>
  );
};
