import React from 'react';
import type { FC } from 'react';
import { Cell, Row } from 'components/table';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Dropdown } from 'components/dropdown';
import { DeleteInvoice } from 'components/partners/delete-invoice';
import { toddMMYYY } from 'lib/dates';
import { INVOICE_PAID, INVOICE_PENDING } from 'data/users/constants';
import { toDecimalCurrency } from 'lib/currency';
import type { UsersInvoice } from 'types/graphql';

interface Props {
  invoice: UsersInvoice;
}

export const PartnerInvoicesRow: FC<Props> = ({ invoice }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row key={invoice.id}>
      <Cell>
        <Icon name='file-line' className='file' />
        <a href={invoice.invoiceUrl}>
          {invoice.filename}
        </a>
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
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' buttonDisabled={invoice.status === INVOICE_PAID} ref={rowActionsRef}>
          <DeleteInvoice
            invoice={invoice} 
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
