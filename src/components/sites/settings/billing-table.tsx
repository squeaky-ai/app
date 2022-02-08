import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { startCase } from 'lodash';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Table, Row, Cell } from 'components/table';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import type { Billing } from 'types/billing';
import type { PlansCurrency, Site } from 'types/graphql';

interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
  currency: PlansCurrency;
}

export const BillingTable: FC<Props> = ({ site, billing, currency, hasBilling }) => {
  const plan = billing.plans.find(plan => Number(plan.id) === site.plan.type);

  const pricing = plan.pricing
    ? plan.pricing.find(p => p.currency === currency)
    : null;

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
              <Cell>{plan.name} Plan, {CURRENCY_SYMBOLS[currency]}{pricing?.amount || 0}</Cell>
              <Cell><Button className='link'>Change plan</Button></Cell>
            </Row>
            <Row>
              <Cell><b>Billing interval</b></Cell>
              <Cell>Monthly</Cell>
              <Cell><Button className='link'>Update</Button></Cell>
            </Row>
            <Row>
              <Cell><b>Next payment</b></Cell>
              <Cell>-</Cell>
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
              <Cell />
            </Row>
            <Row>
              <Cell><b>Your address</b></Cell>
              <Cell>{billing.billing.billingAddress || '-'}</Cell>
              <Cell><Button className='link'>Update</Button></Cell>
            </Row>
            <Row>
              <Cell><b>VAT/GST number</b></Cell>
              <Cell>-</Cell>
              <Cell><Button className='link'>Add</Button></Cell>
            </Row>
          </Table>
          
          {(hasBilling && billing.billing.transactions) && (
            <>
              <h4>Invoices</h4>

              <Table className='transactions-table'>
                {billing.billing.transactions.map((transaction, index) => (
                  <Row key={transaction.id} className={index === 0 ? 'head' : ''}>
                    <Cell><b>{transaction.periodStartAt}</b></Cell>
                    <Cell>Paid</Cell>
                    <Cell>{CURRENCY_SYMBOLS[transaction.currency]}{transaction.amount}</Cell>
                    <Cell>
                      <Link href={transaction.invoiceWebUrl}>
                        <a target='_blank' rel='noreferrer'>
                          View invoice
                        </a>
                      </Link>
                    </Cell>
                  </Row>
                ))}
              </Table>
            </>
          )}
        </>
      )}
    </Container>
  );
};
