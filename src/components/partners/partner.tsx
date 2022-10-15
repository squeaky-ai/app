import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { CreateLead } from 'components/partners/create-lead';
import { Error } from 'components/error';
import { PartnerReferreredSite } from 'components/partners/partner-referrered-site';
import { PageLoading } from 'components/sites/page-loading';
import { Card } from 'components/card';
import { usePartner } from 'hooks/use-partner';
import { buildReferrersColumns } from 'lib/users';

export const Partner: FC = () => {
  const { partner, loading, error } = usePartner();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  const columns = buildReferrersColumns(partner.referrals);

  return (
    <Main>
      <h4 className='title'>Partner Program</h4>
      <h5>Referred Sites <CreateLead partner={partner} /></h5>

      <div className='referrered-sites'>
        <div className='col'>
          <p className='heading'>Lead</p>
          {columns.lead.map(col => <PartnerReferreredSite key={col.id} type='lead' admin={false} referral={col} />)}
        </div>
        <div className='col'>
          <p className='heading'>Site Created: Inactive</p>
          {columns.inactive.map(col => <PartnerReferreredSite key={col.id} type='inactive' admin={false} referral={col} />)}
        </div>
        <div className='col'>
          <p className='heading'>Site Active: Free Plan</p>
          {columns.free.map(col => <PartnerReferreredSite key={col.id} type='free' admin={false} referral={col} />)}
        </div>
        <div className='col'>
          <p className='heading'>Site Active: Paid Plan</p>
          {columns.paid.map(col => <PartnerReferreredSite key={col.id} type='paid' admin={false} referral={col} />)}
        </div>
      </div>

      <h5>Revenue &amp; Commission</h5>

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
          <p>Funds that have been paid out following a received invoices.</p>
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
    </Main>
  );
};
