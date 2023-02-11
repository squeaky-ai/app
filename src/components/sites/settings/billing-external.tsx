import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Button } from 'components/button';
import { Illustration } from 'components/illustration';
import type { SitesProviderAuth } from 'types/graphql';

interface Props {
  providerAuth: SitesProviderAuth;
}

// TODO: Currently only works for duda but should be
// generic and work with any partner that has external
// billing
export const BillingExternal: FC<Props> = ({ providerAuth }) => {
  const handleClick = () => {
    const planData = {
      type: 'upgradeApp',
      appId: providerAuth.providerAppUuid,
    };
  
    window._dAPI?.upgrade({ planData });
  };

  React.useEffect(() => {
    const script = document.createElement('script');
    script.id = 'duda-sdk';
    script.src = providerAuth.sdkUrl;
    document.body.appendChild(script);

    return () => {
      document.getElementById('duda-sdk')?.remove();
    };
  }, []);

  return (
    <div className='billing-external'>
      <Container className='md'>
        <Illustration illustration='illustration-7' height={256} width={500} alt='Unauthorized state' />
        <h4>Your subscription is managed outside of Squeaky</h4>
        <Button className='primary' onClick={handleClick} disabled={!providerAuth}>
          Manage Subscription
        </Button>
      </Container>
    </div>
  );
};
