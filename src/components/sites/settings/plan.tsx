import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import type { Billing } from 'types/billing';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  billing: Billing;
}

export const Plan: FC<Props> = ({ site, billing }) => {
  const plan = billing.plans.find(p => p.name === site.plan.name);

  return (
    <Card className='plan-card'>
      <div className='col details'>
        <h4>
          {plan.name} Plan
          <span>TODO per month</span>
        </h4> 
        <p>up to {plan.maxMonthlyRecordings.toLocaleString()} visits per month</p>
        <ul>
          <li><Icon name='check-line' /> Unlimited team members</li>
          <li><Icon name='check-line' /> Recordings</li>
          <li><Icon name='check-line' /> Visitor profiles</li>
          <li><Icon name='check-line' /> Analytics</li>
          <li><Icon name='check-line' /> NPS® &amp; Sentiment feedback</li>
          <li><Icon name='check-line' /> Heatmaps</li>
          <li><Icon name='check-line' /> Email support</li>
        </ul>
      </div>
      <div className='col change'>
        <Button className='primary'>Change plan</Button>
        <p><Icon name='time-line' /> Cancel anytime</p>
      </div>
    </Card>
  );
};
