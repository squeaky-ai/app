import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Button } from 'components/button';
import { Illustration } from 'components/illustration';
import { BillingFreeTrial } from 'components/sites/settings/billing-free-trial';
import type { Site, SitesProviderAuth, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
  providerAuth: SitesProviderAuth;
}

// TODO: Currently only works for duda but should be
// generic and work with any partner that has external
// billing
export const BillingExternal: FC<Props> = ({ site, member, providerAuth }) => {
  const handleClick = () => {
    const planData = {
      type: 'upgradeApp',
      appId: providerAuth.providerAppUuid,
    };

    window.parent.postMessage(JSON.stringify(planData), '*');
  };

  return (
    <>
      <div className='billing-external'>
        <Container className='md'>
          <Illustration illustration='illustration-7' height={256} width={500} alt='Unauthorized state' />
          <h4>Your subscription is managed outside of Squeaky</h4>
          <Button className='primary' onClick={handleClick} disabled={!providerAuth}>
            Manage Subscription
          </Button>
        </Container>

        <Container className='md-lg'>
          <BillingFreeTrial site={site} member={member} />
        </Container>
      </div>
    </>
  );
};
