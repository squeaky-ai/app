import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { UserPartnerInvoiceRow } from 'components/admin/user-partner-invoice-row';
import { InvoicesSort } from 'types/admin';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

export const UserPartnerInvoices: FC<Props> = ({ user }) => {
  const [sort, setSort] = React.useState<InvoicesSort>(InvoicesSort.IssuedAtDesc);

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
              <UserPartnerInvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </Table>
        </TableWrapper>
      )}
    </div>
  );
};
