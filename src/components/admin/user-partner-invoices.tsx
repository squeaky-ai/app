import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { InvoicesSort } from 'types/admin';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { UserPartnerInvoicesUpdate } from 'components/admin/user-partner-invoices-update';
import { toDecimalCurrency } from 'lib/currency';
import { toddMMYYY } from 'lib/dates';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { INVOICE_PENDING } from 'data/users/constants';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartnerInvoices: FC<Props> = ({ user }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const [sort, setSort] = React.useState<InvoicesSort>(InvoicesSort.IssuedAtDesc);

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  const { invoices } = user.partner;
  const hasInvoices = invoices.length > 0;

  return (
    <div className='invoices'>
      {!hasInvoices && (
        <Container className='sm centered empty-state show'>
          <div className='empty-state-contents'>
            <p>You don&apos;t have any invoices</p>
          </div>
        </Container>
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
              <Cell />
            </Row>
            {invoices.map(invoice => (
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
                <Cell>
                <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
                  <UserPartnerInvoicesUpdate 
                    invoice={invoice} 
                    onClose={onRowActionClose}
                  />
                </Dropdown>
                </Cell>
              </Row>
            ))}
          </Table>
        </TableWrapper>
      )}
    </div>
  );
};
