import { capitalize } from 'lodash';
import { toSlashyDate } from 'lib/dates';
import type { Visitor, RecordingsDevice, RecordingsCountry, VisitorsFilters, FiltersDate } from 'types/graphql';

export function getLinkedData<T>(visitor: Pick<Visitor, 'linkedData'>): T {
  try {
    return JSON.parse(visitor.linkedData);
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

export function groupVisitorCountries(countries: RecordingsCountry[]): RecordingsCountry[] {
  const out: RecordingsCountry[] = [];

  for (const country of countries) {
    if (!out.find(a => a.code === country.code)) {
      out.push(country);
    }
  }

  return out;
}

export function groupVisitorDevices(devices: RecordingsDevice[]): RecordingsDevice[] {
  const viewport = ({ deviceX, deviceY }: RecordingsDevice) => `${deviceX}_${deviceY}`;

  return devices.reduce((acc, device) => {
    if (!acc.find(a => viewport(a) === viewport(device))) {
      acc.push(device);
    }

    return acc;
  }, [] as RecordingsDevice[]);
}

const replaceDateTypes = (dateFilters: FiltersDate): FiltersDate => ({
  ...dateFilters,
  fromDate: toSlashyDate(dateFilters.fromDate),
  betweenFromDate: toSlashyDate(dateFilters.betweenFromDate),
  betweenToDate: toSlashyDate(dateFilters.betweenToDate),
});

export const formatFilterDates = (filters: VisitorsFilters): VisitorsFilters => ({
  ...filters,
  firstVisited: replaceDateTypes(filters.firstVisited),
  lastActivity: replaceDateTypes(filters.lastActivity),
});