import { capitalize } from 'lodash';
import type { Device } from 'types/device';
import type { Visitor } from 'types/visitor';

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

export function groupVisitorBrowsers(devices: Device[]): Device[] {
  const out: Device[] = [];

  for (const device of devices) {
    if (!out.find(a => a.browserName === device.browserName)) {
      out.push(device);
    }
  }

  return out;
}

export function groupVisitorDevices(devices: Device[]): Device[] {
  const out: Device[] = [];

  for (const device of devices) {
    const key = (d: Device) => `${d.viewportX}__${d.viewportY}__${d.deviceType}`;

    if (!out.find(a => key(a) === key(device))) {
      out.push(device);
    }
  }

  return out;
}
