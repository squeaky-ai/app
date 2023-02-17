import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Button } from 'components/button';
import { JourneyReferrersMenu } from 'components/sites/journeys/journeys-referrers-menu';
import type { JourneyReferrer } from 'types/journeys';

interface Props {
  referrer: JourneyReferrer;
  pinnedReferrer: string | null;
  hoveredReferrer: string | null;
  setPinnedReferrer: (referrer: string | null) => void;
  setHoveredReferrer: (referrer: string | null) => void;
}

export const JourneyReferrersPage: FC<Props> = ({
  referrer,
  pinnedReferrer,
  hoveredReferrer,
  setPinnedReferrer,
  setHoveredReferrer,
}) => {
  const handleMouseEnter = (referrer: string) => () => setHoveredReferrer(referrer); 

  const handleMouseLeave = () => setHoveredReferrer(null);

  const handleUnpin = () => setPinnedReferrer(null);

  const dimmed = hoveredReferrer && referrer.name !== hoveredReferrer;

  const pinned = pinnedReferrer === referrer.name;

  const hidden = pinnedReferrer && pinnedReferrer !== referrer.name;

  console.log(hidden);

  return (
    <div
      onMouseEnter={handleMouseEnter(referrer.name)}
      onMouseLeave={handleMouseLeave}
      className={classnames('page', { dim: dimmed, hide: hidden })}
    >
      {pinned && (
        <Button className='pin' onClick={handleUnpin}>
          <Icon name='pushpin-line' />
        </Button>
      )}
      <div className='row page-path'>
        <div className={classnames('path', { direct: referrer.direct })}>
          <Icon name='global-line' />
          {referrer.title}
        </div>
        <JourneyReferrersMenu
          pinned={pinnedReferrer === referrer.name}
          pinDisabled={pinnedReferrer && pinnedReferrer !== referrer.name}
          referrer={referrer.name}
          setPinnedReferrer={setPinnedReferrer}
        />
      </div>
      <div className='row'>
        <Pill className='stats'>
          {referrer.percentage}%
        </Pill>
      </div>
    </div>
  );
};
