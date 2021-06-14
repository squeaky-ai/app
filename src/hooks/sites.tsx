import React from 'react';
import { getSites } from '../lib/api/graphql';
import type { Site } from '../types/site';

type Sites = [boolean, Site[]];

export const useSites = (): Sites => {
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
