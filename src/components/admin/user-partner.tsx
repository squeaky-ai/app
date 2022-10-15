import React from 'react';
import type { FC } from 'react';
import { UserPartnerTabs } from 'components/admin/user-partner-tabs';
import { UserPartnerReferreredSites } from 'components/admin/user-partner-referrered-sites';
import { UserPartnerRevenue } from 'components/admin/user-partner-revenue';
import { UserPartnerInvoices } from 'components/admin/user-partner-invoices';
import { AdminUserPartnerTabs } from 'types/admin';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartner: FC<Props> = ({ user }) => {
  const [tab, setTab] = React.useState<AdminUserPartnerTabs>(AdminUserPartnerTabs.REFERRERD_SITES);

  return (
    <div className='user-partner'>
      <UserPartnerTabs tab={tab} onChange={setTab} />
      {tab === AdminUserPartnerTabs.REFERRERD_SITES && (
        <UserPartnerReferreredSites user={user} />
      )}
      {tab === AdminUserPartnerTabs.REVENUE_COMMISSION && (
        <UserPartnerRevenue user={user} setTab={setTab} />
      )}
      {tab === AdminUserPartnerTabs.INVOICES && (
        <UserPartnerInvoices user={user} />
      )}
    </div>
  );
};
