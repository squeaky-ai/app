import { FiltersSize } from 'types/graphql';
import type { Activity } from 'types/event';
import type { Column } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

export const ACTIVITIES: Activity[] = [
  {
    name: 'Page views',
    value: 'page_view',
  },
  {
    name: 'Clicks',
    value: 'click',
  },
  {
    name: 'Focus',
    value: 'focus',
  },
  {
    name: 'Blur',
    value: 'blur',
  },
  {
    name: 'Touch',
    value: 'touch',
  },
  {
    name: 'Hover',
    value: 'hover',
  },
  {
    name: 'Scrolling',
    value: 'scroll',
  },
];

export const COLUMNS: Column[] = [
  {
    label: 'Select',
    width: '58px',
    disabled: false,
    position: 1,
  },
  {
    label: 'Status',
    width: '105px',
    disabled: false,
    position: 2,
  },
  {
    label: 'Recording ID',
    width: '165px',
    disabled: false,
    position: 3,
  },
  {
    label: 'Visitor ID',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
  
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Duration',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Pages',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Traffic Source',
    width: '2fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Start & Exit URL',
    width: '2fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Country',
    width: '100px',
    disabled: false,
    position: 11,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 12,
  },
  {
    label: 'NPS Rating',
    width: '90px',
    disabled: false,
    position: 13,
  },
  {
    label: 'Sentiment Rating',
    width: '90px',
    disabled: false,
    position: 14,
  },
  {
    label: 'Options',
    width: '70px',
    disabled: false,
    position: 15,
  },
];

export const DEFAULT_COLUMNS = COLUMNS.filter(c => [
  'Select', 
  'Status', 
  'Recording ID',
  'Duration', 
  'Pages', 
  'Start & Exit URL',
  'Options',
].includes(c.label));

export const FILTERS: RecordingsFilters = {
  browsers: [],
  devices: [],
  languages: [],
  startUrl: null,
  exitUrl: null,
  visitedPages: [],
  unvisitedPages: [],
  status: null,
  referrers: [],
  tags: [],
  bookmarked: null,
  starred: null,
  duration: {
    rangeType: null,
    fromType: FiltersSize.GreaterThan,
    fromDuration: null,
    betweenFromDuration: null,
    betweenToDuration: null,
  },
  viewport: {
    minHeight: null,
    maxHeight: null,
    maxWidth: null,
    minWidth: null,
  },
  utmCampaign: null,
  utmContent: null,
  utmMedium: null,
  utmSource: null,
  utmTerm: null,
};
