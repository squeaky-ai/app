import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useToasts } from 'hooks/use-toasts';
import { GET_HEATMAPS_QUERY, GET_RECORDING_QUERY } from 'data/heatmaps/queries';
import type { Site } from 'types/graphql';
import type { TimeRange } from 'lib/dates';
import type { Recording, Heatmaps, HeatmapsDevice, HeatmapsType } from 'types/graphql';

interface UseHeatmaps {
  loading: boolean;
  error: boolean;
  heatmaps: Heatmaps;
}

interface UseRecording {
  loading: boolean;
  error: boolean;
  recording: Recording | null;
}

interface Props {
  device: HeatmapsDevice;
  type: HeatmapsType;
  page: string;
  range: TimeRange;
}

export const useHeatmaps = (props: Props): UseHeatmaps => {
  const router = useRouter();
  const toasts = useToasts();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_HEATMAPS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      device: props.device,
      type: props.type,
      page: props.page,
      ...props.range,
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  const fallback: Heatmaps = {
    desktopCount: 0,
    tabletCount: 0,
    mobileCount: 0,
    recordingId: null,
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


export const useRecording = (id: string): UseRecording => {
  const router = useRouter();
  const toasts = useToasts();

  const { data, loading, previousData, error } = useQuery<{ site: Site }>(GET_RECORDING_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      recordingId: id || router.query.recording_id as string,
      eventPage: 1,
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  return {
    loading, 
    error: !!error,
    recording: data 
      ? data.site.recording 
      : previousData ? previousData.site.recording : null
  };
};
