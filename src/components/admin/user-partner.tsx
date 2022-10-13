import React from 'react';
import type { FC } from 'react';
import { UserPartnerTabs } from 'components/admin/user-partner-tabs';
import { AdminUserPartnerTabs } from 'types/admin';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartner: FC<Props> = () => {
  const [tab, setTab] = React.useState<AdminUserPartnerTabs>(AdminUserPartnerTabs.REFERRERD_SITES);

  return (
    <div className='user-partner'>
      <UserPartnerTabs tab={tab} onChange={setTab} />
    </div>
  );
};
