import { capitalize } from 'lodash';
import type { Visitor, RecordingsDevice } from 'types/graphql';

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
