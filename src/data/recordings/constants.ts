import { FiltersSize } from 'types/graphql';
import type { EventItem } from 'types/event';
import type { Column } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

export const EVENTS: EventItem[] = [
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
  {
    name: 'Javascript Error',
    value: 'error',
  },
  {
    name: 'Other tracked events',
    value: 'custom',
  },
];

export const COLUMNS: Column[] = [
  {
    label: 'Select',
    width: '48px',
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
    label: 'User ID',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Name',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Email',
    width: '2fr',
    disabled: false,
    position: 7,
  },
  {
  
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Duration',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Activity',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Pages',
    width: '1fr',
    disabled: false,
    position: 11,
  },
  {
    label: 'Traffic Source',
    width: '2fr',
    disabled: false,
    position: 12,
  },
  {
    label: 'Start & Exit URL',
    width: '2fr',
    disabled: false,
    position: 13,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 14,
  },
  {
    label: 'Country',
    width: '100px',
    disabled: false,
    position: 15,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 16,
  },
  {
    label: 'NPS Rating',
    width: '90px',
    disabled: false,
    position: 17,
  },
  {
    label: 'Sentiment Rating',
    width: '90px',
    disabled: false,
    position: 18,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 19,
  },
];

export const DEFAULT_COLUMNS = COLUMNS.filter(c => [
  'Select', 
  'Status', 
  'Recording ID',
  'Duration', 
  'Activity', 
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
  visitorType: null,
};
