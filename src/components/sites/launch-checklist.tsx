import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { updateSite } from 'lib/api/graphql';
import { MEMBER } from 'data/teams/constants';
import type { Team } from 'types/team';
import type { Site } from 'types/site';
import { useToasts } from 'hooks/toasts';

interface Props {
  site: Site;
  member: Team;
}

export const LaunchChecklist: FC<Props> = ({ site, member }) => {
  const toasts = useToasts();

  const hasAdded = true;
  const hasInstalled = !!site.verifiedAt;
  const hasTeamMembers = site.team.length > 1;

  const completedCount = [hasAdded, hasInstalled, hasTeamMembers].filter(Boolean).length;

  if (completedCount === 3 || site.checklistDismissedAt || member.role === MEMBER) {
    return null;
  }

  const handleDissmiss = async () => {
    const { error } = await updateSite({ siteId: site.id, dismissChecklist: true });

    if (error) {
      toasts.add({ type: 'error', body: 'There was an issue removing the checklist. Please try again.' });
    }
  };

  return (
    <Dropdown className='launch-checklist' buttonClassName='primary' button={<>🚀 Launch checklist <span>{completedCount}/3</span></>}>
      <ul>
        <li>
          <span className='button complete'>
            <i className='check ri-checkbox-circle-line' />
            Add your site in Squeaky
          </span>
        </li>
        <li>
          <Link href={`/sites/${site.id}/settings`}>
            <a className={classnames('button', { complete: hasInstalled })}>
              <span className='text'>
                <i className='check ri-checkbox-circle-line' />
                Install Squeaky on your site
              </span>
              <i className='indicator ri-arrow-drop-right-line' />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/sites/${site.id}/team`}>
            <a className={classnames('button', { complete: hasTeamMembers })}>
              <span className='text'>
                <i className='check ri-checkbox-circle-line' />
                Invite team members <i>(Optional)</i>
              </span>
              <i className='indicator ri-arrow-drop-right-line' />
            </a>
          </Link>
        </li>
      </ul>

      {hasInstalled && (
        <Button className='link remove-checklist' onClick={handleDissmiss}>
          Remove checklist
        </Button>
      )}
    </Dropdown>
  );
};
