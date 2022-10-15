import React from 'react';
import type { FC } from 'react';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartnerReferreredSite: FC<Props> = () => {
  return (
    <div className='referrered-sites'>
      <div className='col'>
        <p className='heading'>Lead</p>
      </div>
      <div className='col'>
        <p className='heading'>Site Created: Inactive</p>
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Free Plan</p>
      </div>
      <div className='col'>
        <p className='heading'>Site Active: Paid Plan</p>
      </div>
    </div>
  );
};
