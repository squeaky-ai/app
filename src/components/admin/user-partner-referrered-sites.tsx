import React from 'react';
import type { FC } from 'react';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { UserPartnerReferreredSite } from 'components/admin/user-partner-referrered-site';
import { useAdminUserReferrals } from 'hooks/use-admin-user-referrals';
import type { ReferreredSiteColumns } from 'types/admin';
import type { AdminUser, UsersReferral } from 'types/graphql';

type Referrals = Record<ReferreredSiteColumns, UsersReferral[]>;


interface Props {
  user: AdminUser;
}

export const UserPartnerReferreredSites: FC<Props> = () => {
  const { referrals, loading, error } = useAdminUserReferrals();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  const defaultValues: Referrals = { lead: [], inactive: [], free: [], paid: [] };

  const columns = referrals.reduce((acc, referral: UsersReferral) => {
    if (!referral.site) {
      acc.lead.push(referral);
      return acc;
    }
    if (!referral.site.verifiedAt) {
      acc.inactive.push(referral);
      return acc;
    }
    if (referral.site.plan.tier === 0) {
      acc.free.push(referral);
      return acc;
    }
    if (referral.site.plan.tier > 0) {
      acc.paid.push(referral);
      return acc;
    }

    return acc;
  }, defaultValues);

  return (
    <div className='referrered-sites'>
      <div className='col'>
        <p className='heading'>Lead</p>
        {columns.lead.map(col => <UserPartnerReferreredSite key={col.id} type='lead' referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Created: Inactive</p>
        {columns.inactive.map(col => <UserPartnerReferreredSite key={col.id} type='inactive' referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Free Plan</p>
        {columns.free.map(col => <UserPartnerReferreredSite key={col.id} type='free' referral={col} />)}
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Paid Plan</p>
        {columns.paid.map(col => <UserPartnerReferreredSite key={col.id} type='paid' referral={col} />)}
      </div>
    </div>
  );
};
