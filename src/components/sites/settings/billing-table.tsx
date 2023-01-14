import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { startCase, last } from 'lodash';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Table, Row, Cell } from 'components/table';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Transactions } from 'components/sites/settings/transactions';
import { BillingPortalButton } from 'components/sites/settings/billing-portal-button';
import type { Billing } from 'types/billing';
import type { Site, SitesBillingAddress } from 'types/graphql';

interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
}

const addressFields: Array<keyof SitesBillingAddress> = ['line1', 'line2', 'city', 'state', 'postalCode', 'country'];

const getIntervalName = (interval: string) => {
  switch(interval) {
    case 'month':
      return 'Monthly';
    case 'year':
      return 'Yearly';
    default: 
      return 'Unknown';
  }
}

export const BillingTable: FC<Props> = ({ site, billing, hasBilling }) => {
  const router = useRouter();

  const latestTransaction = last(billing.billing?.transactions);

  const currency = latestTransaction?.currency;
  const interval = latestTransaction?.interval;
  const pricing = billing.plan.pricing.find(p => p.currency === currency);

  const onBackToPlansTab = () => router.push(router.asPath.split('?')[0]);

  return (
    <Container className='md billing'>
      {!hasBilling && (
        <>
          <p>No billing</p>
        </>
      )}

      {hasBilling && (
        <>
          <h4>Subscription</h4>

          <Table className='billing-table'>
            <Row className='head'>
              <Cell><b>Plan</b></Cell>
              <Cell>
                {billing.plan.name} Plan
                {pricing?.amount ? `, ${CURRENCY_SYMBOLS[currency]}${(pricing.amount)}` : ''}
                </Cell>
              <Cell>
                <Button onClick={onBackToPlansTab} className='link'><span>Change plan</span></Button>
              </Cell>
            </Row>
            <Row>
              <Cell><b>Billing interval</b></Cell>
              <Cell>{getIntervalName(interval)}</Cell>
              <Cell />
            </Row>
            <Row>
              <Cell><b>Payment method</b></Cell>
              <Cell>
                {(billing.billing.cardType && billing.billing.cardNumber)
                  ? `${startCase(billing.billing.cardType)} ending in ${billing.billing.cardNumber}`
                  : '-'
                } 
              </Cell>
              <Cell>
                <BillingPortalButton site={site} buttonClassName='link' />
              </Cell>
            </Row>
            <Row className={classnames('address', { 'has-address': !!billing.billing.billingAddress })}>
              <Cell><b>Address</b></Cell>
              <Cell>
                {billing.billing.billingAddress
                  ? (
                    <p>
                      {addressFields.map((x, i) => {
                        const value = billing.billing.billingAddress[x];
                        return <span key={i}>{value ? <>{value}<br /></> : null}</span>
                      })}
                    </p>
                  )
                  : '-'
                }
              </Cell>
              <Cell>
                <BillingPortalButton site={site} buttonClassName='link' />
              </Cell>
            </Row>
            <Row>
              <Cell><b>VAT/GST number</b></Cell>
              <Cell>
                {billing.billing.taxIds?.length
                  ? billing.billing.taxIds.map(t => t.value).join(', ')
                  : '-'
                }
              </Cell>
              <Cell>
                <BillingPortalButton site={site} buttonClassName='link' />
              </Cell>
            </Row>
          </Table>
          
          {billing.billing.transactions && (
            <Transactions billing={billing.billing} />
          )}
        </>
      )}
    </Container>
  );
};
