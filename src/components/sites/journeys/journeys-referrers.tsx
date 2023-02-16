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

  const referrers = uniq(journeys.map(j => j.referrer));

  const getPercentageForReferrer = (referrer?: string) => percentage(
    journeys.length,
    journeys.filter(j => j.referrer === referrer).length
  );

  const results = referrers
    .map(referrer => ({
      name: referrer || 'direct',
      title: referrer || <>Direct <i>(None/Unknown)</i></>,
      percentage: getPercentageForReferrer(referrer),
      direct: !referrer,
    }))
    .sort((a, b) => Number(b.percentage) - Number(a.percentage));

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
      {results.map(r => (
        <div key={r.name} className='page'>
          <div className='row page-path'>
            <div className={classnames('path', { direct: r.direct })}>
              <Icon name='global-line' />
              {r.title}
            </div>
          </div>
          <div className='row'>
            <Pill className='stats'>
              {r.percentage}%
            </Pill>
          </div>
        </div>
      ))}
    </div>
  );
};
