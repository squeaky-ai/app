import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { InvoicesSort } from 'types/admin';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { toDecimalCurrency } from 'lib/currency';
import { toddMMYYY } from 'lib/dates';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { INVOICE_PENDING } from 'data/users/constants';
import type { UsersPartner } from 'types/graphql';

interface Props {
  partner: UsersPartner;
}

export const PartnerInvoices: FC<Props> = ({ partner }) => {
  const [sort, setSort] = React.useState<InvoicesSort>(InvoicesSort.IssuedAtDesc);

  const hasInvoices = partner.invoices.length > 0;

  return (
    <div className='invoices'>
      {!hasInvoices && (
        <p>You don&apos;t have any invoices</p>
      )}

      {hasInvoices && (
        <TableWrapper>
          <Table className='invoices-table'>
            <Row className='head'>
              <Cell>Invoice number</Cell>
              <Cell>Status</Cell>
              <Cell>Invoice amount</Cell>
              <Cell>
                Date issued
                <Sort
                  name='issued_at' 
                  order={sort} 
                  onAsc={() => setSort(InvoicesSort.IssuedAtAsc)} 
                  onDesc={() => setSort(InvoicesSort.IssuedAtDesc)} 
                />
              </Cell>
              <Cell>
                Date due
                <Sort
                  name='due_at' 
                  order={sort} 
                  onAsc={() => setSort(InvoicesSort.DueAtAsc)} 
                  onDesc={() => setSort(InvoicesSort.DueAtDesc)} 
                />
              </Cell>
              <Cell>
                Date paid
                <Sort
                  name='paid_at' 
                  order={sort} 
                  onAsc={() => setSort(InvoicesSort.PaidAtAsc)} 
                  onDesc={() => setSort(InvoicesSort.PaidAtDesc)} 
                />
              </Cell>
            </Row>
            {partner.invoices.map(invoice => (
              <Row key={invoice.id}>
                <Cell>
                  <Icon name='file-line' className='file' />
                  <Link href={invoice.invoiceUrl}>
                    <a>{invoice.invoiceNumber}</a>
                  </Link>
                </Cell>
                <Cell>
                  {invoice.status === INVOICE_PENDING
                    ? <Pill className='tertiary'>Pending</Pill>
                    : <Pill className='primary'>Paid</Pill>
                  }
                </Cell>
                <Cell>{CURRENCY_SYMBOLS[invoice.currency]}{toDecimalCurrency(invoice.amount)}</Cell>
                <Cell>{invoice.issuedAt ? (toddMMYYY(new Date(invoice.issuedAt))) : '-'}</Cell>
                <Cell>{invoice.dueAt ? (toddMMYYY(new Date(invoice.dueAt))) : '-'}</Cell>
                <Cell>{invoice.paidAt ? (toddMMYYY(new Date(invoice.paidAt))) : '-'}</Cell>
              </Row>
            ))}
          </Table>
        </TableWrapper>
      )}
    </div>
  );
};
