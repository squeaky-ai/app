import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { CreateLead } from 'components/partners/create-lead';
import { Error } from 'components/error';
import { PartnerReferreredSite } from 'components/partners/partner-referrered-site';
import { PageLoading } from 'components/sites/page-loading';
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

      <h5>Invoices</h5>
      <p>Please send invoices to <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a></p>
    </Main>
  );
};
