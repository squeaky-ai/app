import { capitalize } from 'lodash';
import type { Visitor, RecordingsDevice, RecordingsCountry } from 'types/graphql';

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
