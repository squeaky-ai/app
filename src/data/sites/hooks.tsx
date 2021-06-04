import React from 'react';
import { useRouter } from 'next/router';
import { useSqueaky } from 'components/SqueakyProvider';
import { Site } from './types';

export const useSite = (): [Site | null, boolean] => {
  const api = useSqueaky();
  const router = useRouter();

  const [site, setSite] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      // TODO: For some reason query is empty on first page load
      const id = router.query.site_id || location.pathname.match(/\/sites\/(\d+)\//)[1];

      const { site } = await api.getSite(id as string || '');
      setSite(site);
      setLoading(false);
    })();
  }, []);

  return [site, loading];
};