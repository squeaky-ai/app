import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import type { Site } from 'types/graphql';
import { Button } from 'components/button';
import { Illustration } from 'components/illustration';

interface Props {
  site: Site;
}

export const BillingExternal: FC<Props> = ({ site }) => {
  const handleClick = () => {
    const planData = {
      type: 'upgradeApp',
      appId: site.providerAuth.providerAppUuid,
    };

    console.log({ planData });
  
    // window._dAPI?.upgrade({ planData });
  };

  return (
    <div className='billing-external'>
      <Container className='md'>
        <Illustration illustration='illustration-7' height={256} width={500} alt='Unauthorized state' />
        <h4>Your subscription is managed outside of Squeaky</h4>
        <Button className='primary' onClick={handleClick}>
          Manage Subscription
        </Button>
      </Container>
    </div>
  );
};
