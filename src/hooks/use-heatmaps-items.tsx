import React from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { HeatmapsType } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { HeatmapsClickCount, HeatmapsClickPosition, HeatmapsScroll, HeatmapsCursor } from 'types/heatmaps';
import type { HeatmapsDevice } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

interface UseHeatmapsItems {
  loading: boolean;
  error: boolean;
  clickCounts: HeatmapsClickCount[];
  clickPositions: HeatmapsClickPosition[];
  scrolls: HeatmapsScroll[];
  cursors: HeatmapsCursor[];
}

interface Params {
  device: HeatmapsDevice;
  page_url: string;
  from_date: string;
  to_date: string;
}

interface Props {
  type: HeatmapsType;
  device: HeatmapsDevice;
  page: string;
  range: TimeRange;
}

const fetchResults = async <T extends any>(params: Params, pathname: string): Promise<T> => {
  const { data } = await axios.get(
    `${publicRuntimeConfig.apiHost}${pathname}`, 
    { params }
  );
  return data;
};

const fetchClickCounts = async (params: Params, siteId: string): Promise<HeatmapsClickCount[]> => {
  return fetchResults(params, `/api/sites/${siteId}/heatmaps/click_counts`);
};

const fetchClickPositions = async (params: Params, siteId: string): Promise<HeatmapsClickPosition[]> => {
  return fetchResults(params, `/api/sites/${siteId}/heatmaps/click_positions`);
};

const fetchScrolls = async (params: Params, siteId: string): Promise<HeatmapsScroll[]> => {
  return fetchResults(params, `/api/sites/${siteId}/heatmaps/scrolls`);
};

const fetchCursors = async (params: Params, siteId: string): Promise<HeatmapsCursor[]> => {
  return fetchResults(params, `/api/sites/${siteId}/heatmaps/cursors`);
};

export const useHeatmapsItems = ({ type, device, page, range }: Props): UseHeatmapsItems => {
  const router = useRouter();

  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [clickCounts, setClickCounts] = React.useState<HeatmapsClickCount[]>([]);
  const [clickPositions, setClickPositions] = React.useState<HeatmapsClickPosition[]>([]);
  const [scrolls, setScrolls] = React.useState<HeatmapsScroll[]>([]);
  const [cursors, setCursors] = React.useState<HeatmapsCursor[]>([]);

  const { fromDate, toDate } = range;
  const siteId = `${router.query.site_id}`;

  const params: Params = {
    device,
    page_url: page,
    from_date: fromDate,
    to_date: toDate,
  };

  const requestFactory = async () => {
    setError(false);
    setLoading(true);

    try {
      switch(type) {
        case HeatmapsType.ClickCount:
          const clickCounts = await fetchClickCounts(params, siteId);
          setClickCounts(clickCounts);
          break;
        case HeatmapsType.ClickPosition:
          const clickPositions = await fetchClickPositions(params, siteId);
          setClickPositions(clickPositions);
          break;
        case HeatmapsType.Cursor:
          const cursors = await fetchCursors(params, siteId);
          setCursors(cursors);
          break;
        case HeatmapsType.Scroll:
          const scrolls = await fetchScrolls(params, siteId);
          setScrolls(scrolls);
          break;
      }
    } catch(error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!page) return;
    requestFactory();
  }, [type, page, device, fromDate, toDate]);

  return {
    loading,
    error,
    clickCounts,
    clickPositions,
    scrolls,
    cursors,
  };
};
