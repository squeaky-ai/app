import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';
import { Drawer } from 'components/drawer';
import { Access } from 'components/sites/access';
import { DeleteSite } from 'components/sites/delete-site';
import { OWNER } from 'data/teams/constants';
import type { Site } from 'types/site';
import type { Team } from 'types/team';

interface Props {
  site: Site;
  member: Team;
}

export const SettingsDeleteSite: FC<Props> = ({ site, member }) => {
  if (member.role !== OWNER) return null;

  return (
    <Drawer title='Site deletion' name='delete' aside={<Access roles={[OWNER]} />}>
      <Container className='md'>
        <p><b>You can delete your site at any time:</b></p>
        <ul className='delete-list'>
          <li>The site will be deleted immediately for all users.</li>
          <li>Deleting your site will not delete your Squeaky user account. To delete you account please visit the <Link href='/users/account'><a>account settings page</a></Link>.</li>
          <li>Site deletion is irreversable. If you have an active subscription you can downgrade to a free plan in the <Link href={`/sites/${site.id}/subscription`}><a>subscription tab</a></Link>.</li>
        </ul>
        <DeleteSite site={site} />
      </Container>
    </Drawer>
  );
};
