import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_HEATMAPS_QUERY } from 'data/heatmaps/queries';
import type { TimeRange } from 'types/common';
import type { Site, Heatmaps, HeatmapsDevice, HeatmapsType } from 'types/graphql';

interface UseHeatmaps {
  loading: boolean;
  error: boolean;
  heatmaps: Heatmaps;
}

interface Props {
  device: HeatmapsDevice;
  type: HeatmapsType;
  page: string;
  range: TimeRange;
  cluster: number;
  excludeRecordingIds: string[];
}

function getVariablesForProps(siteId: string, props: Props) {
  return {
    siteId,
    device: props.device,
    type: props.type,
    page: props.page,
    cluster: props.cluster,
    excludeRecordingIds: props.excludeRecordingIds,
    ...props.range,
  }
}

export const useHeatmaps = (props: Props): UseHeatmaps => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_HEATMAPS_QUERY, {
    variables: getVariablesForProps(router.query.site_id as string, props),
  });

  const defaults: Heatmaps = {
    counts: {
      desktop: 0,
      tablet: 0,
      mobile: 0,
    },
    recording: null,
    items: [],
  };

  return {
    loading,
    error: !!error,
    heatmaps: { ...defaults, ...data?.site?.heatmaps },
  };
};
