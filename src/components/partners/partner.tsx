import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { CreateLead } from 'components/partners/create-lead';
import { Error } from 'components/error';
import { PartnerReferreredSite } from 'components/partners/partner-referrered-site';
import { PageLoading } from 'components/sites/page-loading';
import { Card } from 'components/card';
import { PartnerInvoices } from 'components/partners/partner-invoices';
import { usePartner } from 'hooks/use-partner';
import { buildReferrersColumns } from 'lib/users';
import { toDecimalCurrency } from 'lib/currency';
import { CreateInvoice } from 'components/partners/create-invoice';
import { getAllTimeCommission, getAvailablePayout, getHistoricalPayouts } from 'lib/comisssion';
import { Currency } from 'types/graphql';

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

      <h5>Revenue &amp; Commission</h5>

      <div className='revenue'>
        <Card>
          <h5>Available to pay out</h5>
          <p>Funds can be invoiced for at any time. The available payout represents all historical/completed months that have been paid for by the respective site.</p>
          <div className='stats mauve'>
          <h3>€{toDecimalCurrency(getAvailablePayout(partner, Currency.Eur))}</h3>
          <h3>${toDecimalCurrency(getAvailablePayout(partner, Currency.Usd))}</h3>
          <h3>£{toDecimalCurrency(getAvailablePayout(partner, Currency.Gbp))}</h3>
          </div>
        </Card>
        <Card>
          <h5>Historical pay outs</h5>
          <p>Funds that have been paid out following a received invoices.</p>
          <div className='stats'>
          <h3>€{(toDecimalCurrency(getHistoricalPayouts(partner, Currency.Eur)))}</h3>
          <h3>${(toDecimalCurrency(getHistoricalPayouts(partner, Currency.Usd)))}</h3>
          <h3>£{(toDecimalCurrency(getHistoricalPayouts(partner, Currency.Gbp)))}</h3>
          </div>
        </Card>
        <Card>
          <h5>All time commission</h5>
          <p>Shows all commision booked since the partnership commenced.</p>
          <div className='stats'>
          <h3>€{toDecimalCurrency(getAllTimeCommission(partner, Currency.Eur))}</h3>
          <h3>${toDecimalCurrency(getAllTimeCommission(partner, Currency.Usd))}</h3>
          <h3>£{toDecimalCurrency(getAllTimeCommission(partner, Currency.Gbp))}</h3>
          </div>
        </Card>
      </div>

      <div className='invoices'>
        <h5>
          Invoices
          <CreateInvoice partner={partner} />
        </h5>

        <PartnerInvoices partner={partner} />
      </div>
    </Main>
  );
};
