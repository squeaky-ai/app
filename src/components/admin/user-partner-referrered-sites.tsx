import React from 'react';
import type { FC } from 'react';
import { PartnerReferreredSite } from 'components/partners/partner-referrered-site';
import { buildReferrersColumns } from 'lib/users';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartnerReferreredSites: FC<Props> = ({ user }) => {
  const columns = buildReferrersColumns(user.partner.referrals);

  return (
    <div className='referrered-sites'>
      <div className='col'>
        <p className='heading'>Lead</p>
        {columns.lead.map(col => <PartnerReferreredSite key={col.id} type='lead' admin referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Created: Inactive</p>
        {columns.inactive.map(col => <PartnerReferreredSite key={col.id} type='inactive' admin referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Free Plan</p>
        {columns.free.map(col => <PartnerReferreredSite key={col.id} type='free' admin referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Paid Plan</p>
        {columns.paid.map(col => <PartnerReferreredSite key={col.id} type='paid' admin referral={col} />)}
      </div>
    </div>
  );
};
