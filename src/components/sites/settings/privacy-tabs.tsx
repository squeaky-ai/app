import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  page: 'data' | 'consent' | 'customer-support' | 'dpa';
}

export const PrivacyTabs: FC<Props> = ({ site, page }) => (
  <div className='privacy-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Site privacy navigation'>
      <li className='tab'>
        <Link href={`/sites/${site.id}/settings/privacy/data`}>
          <a className={classnames('button tab-button', { active: page === 'data' })}>
            Data Capture
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${site.id}/settings/privacy/consent`}>
          <a className={classnames('button tab-button', { active: page === 'consent' })}>
            Consent
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${site.id}/settings/privacy/customer-support`}>
          <a className={classnames('button tab-button', { active: page === 'customer-support' })}>
            Customer Support
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${site.id}/settings/privacy/dpa`}>
          <a className={classnames('button tab-button', { active: page === 'dpa' })}>
            DPA
          </a>
        </Link>
      </li>
    </ul>
  </div>
);
