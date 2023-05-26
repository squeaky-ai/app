import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FreeTrialTimer } from 'components/sites/free-trial-timer';
import { usePageContext } from 'hooks/use-page-context';
import type { Site, Team } from 'types/graphql';

interface Item {
  href?: string;
  name: string;
}

interface Props {
  site: Site;
  member: Team;
  items: Item[];
}

export const BreadCrumbs: FC<Props> = ({ site, member, items }) => {
  const router = useRouter();

  const { pageState } = usePageContext();

  const isDashboard = router.pathname === '/sites/[site_id]/dashboard';

  return (
    <div className='breadcrumbs'>
      {!pageState.embedded && (
        <>
          <Link href='/sites'>
            All Sites
          </Link>
          <span>/</span>
        </>
      )}
      {isDashboard
        ? <p>{site.name}</p>
        : <Link href={`/sites/${site.id}/dashboard`}>{site.name}</Link>
      }
      <span>/</span>
      {items.map((item, index) => (
        <React.Fragment key={item.name}>
          {item.href
            ? <Link href={item.href}>{item.name}</Link>
            : <p>{item.name}</p>
          }

          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}

      <FreeTrialTimer site={site} member={member} />
    </div>
  );
};
