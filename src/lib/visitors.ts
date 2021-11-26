import { capitalize } from 'lodash';
import { FiltersStart, FiltersRange } from 'types/graphql';
import type { Column } from 'types/visitors';
import type { VisitorsFilters, Visitor, RecordingsDevice } from 'types/graphql';

export function getAttributes<T>(visitor: Visitor): T {
  try {
    return JSON.parse(visitor.attributes);
  } catch {
    return null;
  }
}

export function normalizeKey(key: string): string {
  switch(key) {
    case 'id':
      return 'User ID';
    case 'name':
      return 'Name';
    case 'email':
      return 'Email';
    default:
      return capitalize(key);
  }
};

export function groupVisitorBrowsers(devices: RecordingsDevice[]): RecordingsDevice[] {
  const out: RecordingsDevice[] = [];

  for (const device of devices) {
    if (!out.find(a => a.browserName === device.browserName)) {
      out.push(device);
    }
  }

  return out;
}

export function groupVisitorDevices(devices: RecordingsDevice[]): RecordingsDevice[] {
  return devices.reduce((acc, device) => {
    if (!acc.find(a => a.useragent === device.useragent)) {
      acc.push(device);
    }

    return acc;
  }, [] as RecordingsDevice[]);
}

export const defaultFilters: VisitorsFilters = {
  status: null,
  recordings: {
    rangeType: FiltersRange.GreaterThan,
    count: null
  },
  languages: [],
  firstVisited: {
    rangeType: null,
    fromType: FiltersStart.Before,
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
  lastActivity: {
    rangeType: null,
    fromType: FiltersStart.Before,
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
};

export const allColumns: Column[] = [
  {
    name: 'status',
    label: 'Status',
    width: '105px',
    disabled: false,
  },
  {
    name: 'visitor-id',
    label: 'Visitor ID',
    width: '1fr',
    disabled: true,
  },
  {
    name: 'user-id',
    label: 'User ID',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'name',
    label: 'Name',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'email',
    label: 'Email',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'recordings',
    label: 'Recordings',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'first-visited',
    label: 'First visited',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'last-activity',
    label: 'Last activity',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'language',
    label: 'Language',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'device-viewport',
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'browser',
    label: 'Browser',
    width: '90px',
    disabled: false,
  },
];