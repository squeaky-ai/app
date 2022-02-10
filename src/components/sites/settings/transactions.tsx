import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { orderBy } from 'lodash';
import { Table, Row, Cell } from 'components/table';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import type { SiteBilling } from 'types/graphql';

interface Props {
  billing?: SiteBilling;
}

export const Transactions: FC<Props> = ({ billing }) => {
  const transactions = orderBy(
    billing?.transactions, 
    'periodStartAt', 
    'desc'
  );

  const toDecimalCurrency = (value: number) => {
    const text = value.toString();
    const position = text.length - 2;

    return text.slice(0, position) + '.' + text.slice(position);
  };

  return (
    <>
      <h4>Invoices</h4>

      <Table className='transactions-table'>
        {transactions.map((transaction, index) => (
          <Row key={transaction.id} className={index === 0 ? 'head' : ''}>
            <Cell><b>{transaction.periodStartAt}</b></Cell>
            <Cell>Paid</Cell>
            <Cell>{CURRENCY_SYMBOLS[transaction.currency]}{toDecimalCurrency(transaction.amount)}</Cell>
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
  );
};
