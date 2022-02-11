import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { startCase } from 'lodash';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Table, Row, Cell } from 'components/table';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Transactions } from 'components/sites/settings/transactions';
import type { Billing } from 'types/billing';
import type { PlansCurrency, Site } from 'types/graphql';
import { BillingPortalButton } from './billing-portal-button';

interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
  currency: PlansCurrency;
}

export const BillingTable: FC<Props> = ({ site, billing, currency, hasBilling }) => {
  const router = useRouter();

  const plan = billing.plans.find(plan => Number(plan.id) === site.plan.type);

  const pricing = plan.pricing
    ? plan.pricing.find(p => p.currency === currency)
    : null;

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
                {plan.name} Plan
                {pricing?.amount ? `, ${CURRENCY_SYMBOLS[currency]}${(pricing.amount)}` : ''}
                </Cell>
              <Cell>
                <Button onClick={onBackToPlansTab} className='link'>Change plan</Button>
              </Cell>
            </Row>
            <Row>
              <Cell><b>Billing interval</b></Cell>
              <Cell>Monthly</Cell>
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
                <BillingPortalButton site={site} />
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
