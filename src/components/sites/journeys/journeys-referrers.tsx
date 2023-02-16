import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { uniq } from 'lodash';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { percentage } from 'lib/maths';
import type { AnalyticsUserPath } from 'types/graphql';

interface Props {
  journeys: AnalyticsUserPath[];
}

export const JourneysReferrers: FC<Props> = ({ journeys }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);

  const referrers = uniq(journeys.map(j => j.referrer).filter(j => !!j));

  const getPercentageForReferrer = (referrer?: string) => percentage(
    journeys.length,
    journeys.filter(j => j.referrer === referrer).length
  );

  return (
    <div className={classnames('col referrers', { open })}>
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
      <div className='page'>
        <div className='row page-path'>
          <div className='path direct'>
            <Icon name='global-line' />
              Direct <i>(None/Unknown)</i>
          </div>
        </div>
        <div className='row'>
          <Pill className='stats'>
            {getPercentageForReferrer(null)}%
          </Pill>
        </div>
      </div>
      {referrers.map(referrer => (
        <div key={referrer} className='page'>
          <div className='row page-path'>
            <div className='path'>
              <Icon name='global-line' />
              {referrer}
            </div>
          </div>
          <div className='row'>
            <Pill className='stats'>
              {getPercentageForReferrer(referrer)}%
            </Pill>
          </div>
        </div>
      ))}
    </div>
  );
};
