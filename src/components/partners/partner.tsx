import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { CreateLead } from 'components/partners/create-lead';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { usePartner } from 'hooks/use-partner';

export const Partner: FC = () => {
  const { partner, loading, error } = usePartner();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <Main>
      <h4 className='title'>Partner Program</h4>
      <h5>Referred Sites <CreateLead partner={partner} /></h5>

      {partner.referrals.map(r => (
        <p key={r.url}>{r.url}</p>
      ))}
    </Main>
  );
};
