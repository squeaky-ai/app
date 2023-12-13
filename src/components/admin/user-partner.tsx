import React from 'react';
import type { FC } from 'react';
import { UserPartnerReferreredSites } from 'components/admin/user-partner-referrered-sites';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartner: FC<Props> = ({ user }) => (
  <div className='user-partner'>
    <UserPartnerReferreredSites user={user} />
  </div>
);
