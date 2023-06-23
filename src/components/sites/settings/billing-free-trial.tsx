import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Container } from 'components/container';
import { getRemainingTrialDays } from 'lib/plan';
import { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
}

export const BillingFreeTrial: FC<Props> = ({ site, member }) => {
  const daysRemainingOnTrial = getRemainingTrialDays(site, member?.role);

  if (daysRemainingOnTrial === null) {
    return null;
  }

  return (
    <Container className='lg'>
      <div className='free-trial'>
        <div className='content'>
          <h4>
            <Icon name='time-line' className='star' />
            {daysRemainingOnTrial === 0
              ? <span><b>Less than 24 hours</b> remaining of your <b>14-day</b> paid features trial.</span>
              : <span><b>{daysRemainingOnTrial} day{daysRemainingOnTrial === 1 ? '' : 's'}</b> remaining of your <b>14-day</b> paid features trial.</span>
            }
          </h4>
          <p>At the end of the trial you&apos;ll revert back to the free plan feature-set, unless you upgrade. You can choose a plan below at any time to maintain access to the features you need most.</p>
        </div>
      </div>
    </Container>
  );
};
