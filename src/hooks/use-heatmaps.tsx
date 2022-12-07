import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_HEATMAPS_QUERY } from 'data/heatmaps/queries';
import type { TimeRange } from 'types/common';
import type { Heatmaps } from 'types/heatmaps';
import type { Site, Heatmaps as HeatmapsWithStringItems, HeatmapsDevice, HeatmapsType } from 'types/graphql';

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
  excludeRecordingIds: string[];
}

function getVariablesForProps(siteId: string, props: Props) {
  return {
    siteId,
    type: props.type,
    device: props.device,
    page: props.page,
    excludeRecordingIds: props.excludeRecordingIds,
    ...props.range,
  }
}

function parseJsonResponse(heatmaps: HeatmapsWithStringItems): Heatmaps {
  return {
    ...heatmaps,
    items: JSON.parse(heatmaps.items),
  }
}

export const useHeatmaps = (props: Props): UseHeatmaps => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_HEATMAPS_QUERY, {
    variables: getVariablesForProps(router.query.site_id as string, props),
    skip: !props.page,
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
    heatmaps: data?.site?.heatmaps ? parseJsonResponse(data.site.heatmaps) : defaults,
  };
};
