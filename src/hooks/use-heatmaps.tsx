import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_HEATMAPS_QUERY } from 'data/heatmaps/queries';
import type { Site } from 'types/site';
import type { Heatmaps, HeatmapsDevice, HeatmapsType } from 'types/heatmaps';

interface UseHeatmaps{
  loading: boolean;
  error: boolean;
  heatmaps: Heatmaps;
}

interface Props {
  device: HeatmapsDevice;
  type: HeatmapsType;
  page: string;
}

export const useHeatmaps = (props: Props): UseHeatmaps => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_HEATMAPS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
    }
  });

  if (error) {
    console.error(error);
  }

  const fallback: Heatmaps = {
    desktopCount: 0,
    mobileCount: 0,
    items: [],
  };

  return {
    loading,
    error: !!error,
    heatmaps: (data
      ? data.site.heatmaps
      : previousData ? previousData.site.heatmaps : fallback)
  };
};
