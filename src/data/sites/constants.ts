import type { PlanFeature } from 'types/graphql';

// Should match
// - www.google.com
// - google.com
// - google.co.uk
// - news.google.com
export const HOSTNAME_REGEX = /.*\..*/;

export const MIN_SEARCH_CHARS = 2;

export const MAX_DAYS_BEFORE_POTENTIAL_ISSUE = 3;

export const TIMESTAMP_REGEX = /\d\d:\d\d/;

export const IP_ADDRESS_REGES = /\d+\.\d+\.+\d+\.\d+/;

export const VALID_EVENT_VALUE = /^((?!:nth).)*$/;

export const guideLinks = {
  manual: 'https://squeaky.notion.site/Install-your-tracking-code-6ab27212bb5c434196f494ac43349b72#582b9522ff9a4f268dab90b0be05fbb5',
  wordpress: 'https://squeaky.notion.site/Wordpress-571e94c409f94748a6c40f67b5d79543',
  shopify: 'https://squeaky.notion.site/Shopify-63eef790b11f4ce59108c5f720ff21c5',
  wix: 'https://squeaky.notion.site/Wix-9b6351ec3cdd48b3ae94f5f8b4f3b8db',
  webflow: 'https://squeaky.notion.site/Webflow-ea17dbafc682462d9c5f53a62cc963f9',
  magento: 'https://squeaky.notion.site/Magento-49302bba0c7a48d3aef93e38e8e79643',
  drupal: 'https://squeaky.notion.site/Drupal-401bce8e455246019e9e429641979c53',
};

export const providers = {
  duda: 'duda',
};

export const mapFeatureToRoutes: Record<PlanFeature, string[]> = {
  dashboard: [
    '/sites/[site_id]/dashboard',
  ],
  error_tracking: [
    '/sites/[site_id]/errors',
    '/sites/[site_id]/errors/[error_id]',
  ],
  event_tracking: [
    '/sites/[site_id]/events',
    '/sites/[site_id]/events/history/[history]',
  ],
  heatmaps_click_counts: [
    '/sites/[site_id]/heatmaps/click-counts',
  ],
  heatmaps_click_positions: [
    '/sites/[site_id]/heatmaps/click-positions',
  ],
  heatmaps_mouse: [
    '/sites/[site_id]/heatmaps/mouse',
  ],
  heatmaps_scroll: [
    '/sites/[site_id]/heatmaps/scroll',
  ],
  journeys: [
    '/sites/[site_id]/journeys',
  ],
  nps: [
    '/sites/[site_id]/feedback/nps',
    '/sites/[site_id]/feedback/apperance',
    '/sites/[site_id]/feedback/scheduling',
    '/sites/[site_id]/feedback/form',
    '/sites/[site_id]/feedback/guide',
  ],
  page_analytics: [
    '/sites/[site_id]/analytics/page/traffic',
    '/sites/[site_id]/analytics/page/audience',
  ],
  recordings: [
    '/sites/[site_id]/recordings/[recording_id]',
  ],
  sentiment: [
    '/sites/[site_id]/feedback/sentiment',
    '/sites/[site_id]/feedback/sentiment/apperance',
    '/sites/[site_id]/feedback/sentiment/visibility',
    '/sites/[site_id]/feedback/sentiment/form',
  ],
  site_analytics: [
    '/sites/[site_id]/analytics/site/traffic',
    '/sites/[site_id]/analytics/site/audience',
  ],
  visitors: [
    '/sites/[site_id]/visitors/[visitor_id]',
  ],
  data_export: [
    '/sites/[site_id]/settings/details/data-export',
  ],
};
