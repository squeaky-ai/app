import React from 'react';
import type { FC } from 'react';
import type { AdminUser } from 'types/graphql';
import { Card } from 'components/card';
import { AdminUserPartnerTabs } from 'types/admin';
import { Button } from 'components/button';

interface Props {
  user: AdminUser;
  setTab: (tab: AdminUserPartnerTabs) => void;
}

export const UserPartnerRevenue: FC<Props> = ({ setTab }) => {
  return (
    <div className='revenue'>
      <Card>
        <h5>Available to pay out</h5>
        <p>Funds can be invoiced for at any time. The available payout represents all historical/completed months that have been paid for by the respective site.</p>
        <div className='stats mauve'>
          <h3>€0.00</h3>
          <h3>$0.00</h3>
          <h3>£0.00</h3>
        </div>
      </Card>
      <Card>
        <h5>Monthly partner commission</h5>
        <p>Shows current monthly commission earned through all plans.</p>
        <div className='stats'>
          <h3>€0.00 <i>(0 plans)</i></h3>
          <h3>$0.00 <i>(0 plans)</i></h3>
          <h3>£0.00 <i>(0 plans)</i></h3>
        </div>
      </Card>
      <Card>
        <h5>Historical pay outs</h5>
        <p>Funds that have been paid out following a received <Button className='link' onClick={() => setTab(AdminUserPartnerTabs.INVOICES)}>invoices</Button>.</p>
        <div className='stats'>
          <h3>€0.00</h3>
          <h3>$0.00</h3>
          <h3>£0.00</h3>
        </div>
      </Card>
      <Card>
        <h5>All time commission</h5>
        <p>Shows all commision booked since the partnership commenced.</p>
        <div className='stats'>
          <h3>€0.00</h3>
          <h3>$0.00</h3>
          <h3>£0.00</h3>
        </div>
      </Card>
    </div>
  );
};
