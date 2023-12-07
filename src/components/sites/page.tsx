import React from 'react';
import type { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useSite } from 'hooks/use-site';
import { NotFound } from 'components/sites/not-found';
import { Unauthorized } from 'components/sites/unauthorized';
import { UpgradeRequired } from 'components/sites/upgrade-required';
import { ErrorBoundary } from 'components/sites/error-boundary';
import { usePageContext } from 'hooks/use-page-context';
import { Error } from 'components/error';
import { mapFeatureToRoutes } from 'data/sites/constants';
import type { User, Team, PlanFeature } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Children {
  site: Site;
  member?: Team;
}

interface Props {
  user: User;
  scope: number[];
  children: (site: Children) => ReactElement;
}

export const getTeamMember = (site: Site, user: User): Team | null => {
  if (!site?.team || !user) return null;

  return site.team.find(team => team.user.id.toString() === user.id.toString());
};

const hideForEmbeddedSites = [
  '/sites/[site_id]/settings/details',
  '/sites/[site_id]/settings/details/tracking-code',
  '/sites/[site_id]/settings/details/delete',
];

const featureIsEnabledForPath = (site: Site, path: string): boolean => {
  const featureForPath = Object
    .entries(mapFeatureToRoutes)
    .find(([_, paths]) => paths.includes(path))?.[0] as PlanFeature | undefined;

  // If the path has no feature then assume it is
  // supposed to be shown
  return site?.plan && featureForPath
    ? site.plan.featuresEnabled.includes(featureForPath)
    : true;
}

export const Page: FC<Props> = ({ children, user, scope }) => {
  const router = useRouter();

  const { loading, error, site } = useSite();
  const { setPageState } = usePageContext();

  console.log(user.provider);

  const member = getTeamMember(site, user);
  const featureEnabled = featureIsEnabledForPath(site, router.pathname);
  const embedded = !!site?.provider;

  const authorized = user.superuser 
    ? true 
    : scope.length ? scope.includes(member?.role) : true;

  React.useEffect(() => {
    if (site) {
      // This is really jank to do here. In the old days you'd use a
      // selector inside of the sidebar and fetch the data once it's
      // there, but Apollo doesn't have a way of reading directly from
      // the cache and being notified of changes.
      setPageState({ 
        role: member?.role, 
        validBilling: !site.plan.invalid,
        embedded,
      });
    }
  }, [site]);

  if (loading) {
    return null;
  }

  if (error) {
    return <Error className='site-page-error' />;
  }

  if (!site) {
    return <NotFound className='site-page-error' />;
  }

  if (!authorized) {
    return <Unauthorized />;
  }

  if (!featureEnabled) {
    return <UpgradeRequired site={site} />;
  }

  if (embedded && hideForEmbeddedSites.includes(router.pathname)) {
    return <NotFound className='site-page-error' />
  }

  return (
    <ErrorBoundary>
      {children({ site, member })}
    </ErrorBoundary>
  );
};
