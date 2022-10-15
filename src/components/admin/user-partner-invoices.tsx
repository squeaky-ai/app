import React from 'react';
import type { FC } from 'react';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartnerInvoices: FC<Props> = () => {
  return (
    <div className='invoices'>

    </div>
  );
};
