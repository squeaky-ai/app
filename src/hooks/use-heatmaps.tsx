import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_HEATMAPS_QUERY } from 'data/heatmaps/queries';
import type { Site } from 'types/site';
import type { Heatmaps, HeatmapsDevice, HeatmapsType } from 'types/heatmaps';

interface UseHeatmaps{
  loading: boolean;
  heatmaps: Heatmaps;
}

interface Props {
  device: HeatmapsDevice;
  type: HeatmapsType;
  page: string;
}

export const useHeatmaps = (props: Props): UseHeatmaps => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_HEATMAPS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
    }
  });

  const fallback: Heatmaps = {
    desktopCount: 0,
    mobileCount: 0,
  };

  return {
    loading,
    heatmaps: (data
      ? data.site.heatmaps
      : previousData ? previousData.site.heatmaps : fallback)
  };
};
