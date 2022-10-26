import React from 'react';
import type { FC } from 'react';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { Sort } from 'components/sort';
import { InvoicesSort } from 'types/admin';
import { PartnerInvoicesRow } from 'components/partners/partner-invoices-row';
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
              <Cell />
            </Row>
            {partner.invoices.map(invoice => (
              <PartnerInvoicesRow key={invoice.id} invoice={invoice} />
            ))}
          </Table>
        </TableWrapper>
      )}
    </div>
  );
};
