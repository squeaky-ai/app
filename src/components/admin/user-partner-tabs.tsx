import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { AdminUserPartnerTabs } from 'types/admin';

interface Props {
  tab: AdminUserPartnerTabs;
  onChange: (tab: AdminUserPartnerTabs) => void;
}

export const UserPartnerTabs: FC<Props> = ({ tab, onChange }) => (
  <div className='user-partner-tabs'>
    <ul className='tab-header' role='navigation' aria-label='User partner stats'>
      <li className='tab'>
        <Button className={classnames('button tab-button', { active: tab === AdminUserPartnerTabs.REFERRERD_SITES })} onClick={() => onChange(AdminUserPartnerTabs.REFERRERD_SITES)}>
          Referred Sites
        </Button>
      </li>
      <li className='tab'>
        <Button className={classnames('button tab-button', { active: tab === AdminUserPartnerTabs.REVENUE_COMMISSION })} onClick={() => onChange(AdminUserPartnerTabs.REVENUE_COMMISSION)}>
          Revenue &amp; Commission
        </Button>
      </li>
      <li className='tab'>
        <Button className={classnames('button tab-button', { active: tab === AdminUserPartnerTabs.INVOICES })} onClick={() => onChange(AdminUserPartnerTabs.INVOICES)}>
          Invoices
        </Button>
      </li>
    </ul>
  </div>
);
