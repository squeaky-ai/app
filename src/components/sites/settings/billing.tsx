import React from 'react';
import type { FC } from 'react';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';

export const Billing: FC = () => {
  const { loading, billing } = useBilling();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='billing'>
      {!billing && (
        <p>Billing is not enabled</p>
      )}

      {billing && (
        <p>{JSON.stringify(billing, null, 4)}</p>
      )}
    </div>
  );
};
