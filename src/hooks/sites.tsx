import React from 'react';
import { useRouter } from 'next/router';
import { getSites, getSite } from '../lib/api/graphql';
import type { Site } from '../types/site';

export const useSites = (): [boolean, Site[]] => {
  const [loading, setLoading] = React.useState(true);
  const [sites, setSites] = React.useState<Site[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await getSites();
      setLoading(false);
      setSites(response.sites);
    })();
  }, []);

  return [loading, sites];
};

export const useSite = (): [boolean, Site | null] => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [site, setSite] = React.useState<Site>(null);

  React.useEffect(() => {
    (async () => {
      const response = await getSite(router.query.site_id as string);
      setLoading(false);
      setSite(response.site);
    })();
  }, []);

  return [loading, site];
};
