import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Cell, Row } from 'components/table';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { UserPartnerInvoicesUpdate } from 'components/admin/user-partner-invoices-update';
import { toDecimalCurrency } from 'lib/currency';
import { toddMMYYY } from 'lib/dates';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { INVOICE_PENDING } from 'data/users/constants';
import type { UsersInvoice } from 'types/graphql';

interface Props {
  invoice: UsersInvoice;
}

export const UserPartnerInvoiceRow: FC<Props> = ({ invoice }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row>
      <Cell>
        <Icon name='file-line' className='file' />
        <Link href={invoice.invoiceUrl}>
          {invoice.filename}
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
  );
};
