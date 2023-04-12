import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { OWNER } from 'data/teams/constants';
import { usePageContext } from 'hooks/use-page-context';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import { PlanFeature, Site } from 'types/graphql';
import type { Team } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team; 
  page: 'details' | 'tracking-code' | 'tags' | 'screening' | 'api-key' | 'delete' | 'data-export' | 'url-structure';
}

export const SettingsTabs: FC<Props> = ({ site, page, member }) => {
  const { pageState } = usePageContext();

  return (
    <div className='site-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Account navigation'>
        {!pageState.embedded && (
          <>
            <li className='tab'>
              <Link href={`/sites/${site.id}/settings/details`} className={classnames('button tab-button', { active: page === 'details' })}>
                Site details
              </Link>
            </li>
            <li className='tab'>
              <Link href={`/sites/${site.id}/settings/details/tracking-code`} className={classnames('button tab-button', { active: page === 'tracking-code' })}>
                Tracking code
                {site.verifiedAt 
                  ? site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE
                    ? <span className='badge warning'><Icon name='error-warning-line' /></span> 
                    : <span className='badge verified'><Icon name='checkbox-circle-line' /></span> 
                  : <span className='badge unverified'><Icon name='error-warning-line' /></span>}
              </Link>
            </li>
          </>
        )}
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/tags`} className={classnames('button tab-button', { active: page === 'tags' })}>
            Tags
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/screening`} className={classnames('button tab-button', { active: page === 'screening' })}>
            Screening
          </Link>
        </li>
        {site.plan.featuresEnabled.includes(PlanFeature.DataExport) && (
          <li className='tab'>
            <Link href={`/sites/${site.id}/settings/details/data-export`} className={classnames('button tab-button', { active: page === 'data-export' })}>
              Data export
            </Link>
          </li>
        )}
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/url-structure`} className={classnames('button tab-button', { active: page === 'url-structure' })}>
            URL structure
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/api-key`} className={classnames('button tab-button', { active: page === 'api-key' })}>
            API Key
          </Link>
        </li>
        {member?.role === OWNER && !pageState.embedded && (
          <li className='tab'>
            <Link href={`/sites/${site.id}/settings/details/delete`} className={classnames('button tab-button', { active: page === 'delete' })}>
              Site deletion
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
