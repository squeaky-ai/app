import React from 'react';
import type { FC } from 'react';
import { PlanFeature as PlanFeatures } from 'types/graphql';

interface Props {
  feature: PlanFeatures;
}

const formatFeature = (feature: PlanFeatures): string | React.ReactNode => {
  switch(feature) {
    case PlanFeatures.Dashboard:
      return 'Dashboard';
    case PlanFeatures.ErrorTracking:
      return 'Error tracking';
    case PlanFeatures.EventTracking:
      return 'Event tracking';
    case PlanFeatures.HeatmapsClickCounts:
      return <>Heatmaps <i>(click positions)</i></>;
    case PlanFeatures.HeatmapsClickPositions:
      return <>Heatmaps <i>(click counts)</i></>;
    case PlanFeatures.HeatmapsMouse:
      return <>Heatmaps <i>(mouse)</i></>;
    case PlanFeatures.HeatmapsScroll:
      return <>Heatmaps <i>(scroll)</i></>;
    case PlanFeatures.Journeys:
      return 'Journeys';
    case PlanFeatures.Nps:
      return 'NPS';
    case PlanFeatures.PageAnalytics:
      return 'Page analytics';
    case PlanFeatures.Recordings:
      return 'Recordings';
    case PlanFeatures.Sentiment:
      return 'Sentiment';
    case PlanFeatures.SiteAnalytics:
      return 'Site analytics';
    case PlanFeatures.Visitors:
      return 'Visitors';
    case PlanFeatures.DataExport:
      return 'Data Export';
  }
};

export const PlanFeature: FC<Props> = ({ feature }) => <>{formatFeature(feature)}</>
