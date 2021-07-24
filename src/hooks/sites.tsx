import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SITES_QUERY, GET_SITE_QUERY } from 'data/sites/queries';
import { useToasts } from 'hooks/toasts';
import type { Site } from 'types/site';

export const useSites = (): [boolean, Site[]] => {
  const toasts = useToasts();
  const { loading, data, error } = useQuery(GET_SITES_QUERY);

  if (error) {
    toasts.add({ type: 'error', body: 'There was an unexpected error fetching the sites' });
  }

  return [loading, data ? data.sites : []];
};

export const useSite = (): [boolean, Site | null] => {
  const toasts = useToasts();
  const router = useRouter();

  const { loading, data, error } = useQuery(GET_SITE_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'There was an unexpected error fetching the site' });
  }

  return [loading, data ? data.site : null];
};
