import React from 'react';
import type { FC } from 'react';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';
import { Tabs } from 'components/tabs';
import { Container } from 'components/container';
import type { Site } from 'types/graphql';
import { Plan } from 'components/sites/settings/plan';

interface Props {
  site: Site;
}

export const Billing: FC<Props> = ({ site }) => {
  const { loading, billing } = useBilling();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='billing'>
      <Tabs
        tabs={[
          {
            name: 'Plans',
            page: 'plans',
            body: (
              <Container className='md'>
                <p>All plans come with access to our entire range of customer experience products, including analytics, recordings, feedback and heatmap data.</p>

                <h4>Current plan</h4>

                <Plan site={site} billing={billing} />
              </Container>
            )
          },
          {
            name: 'Billing',
            page: 'billing',
            body: (
              <>
                <p>🙀</p>
              </>
            )
          }
        ]}
      />
    </div>
  );
};
