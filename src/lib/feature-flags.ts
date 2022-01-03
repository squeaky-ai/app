export enum FeatureFlag {
  VISITOR_HOTSPOT = 'VISITOR_HOTSPOT',
  ACTIVE_VISITORS = 'ACTIVE_VISITORS',
}

export class FeatureFlags {
  public static get(key: FeatureFlag): boolean {
    const value = localStorage.getItem(`feature-flag::${key}`);
    return value === 'true';
  }

  public static set(key: FeatureFlag, value: boolean): boolean {
    localStorage.setItem(`feature-flag::${key}`, value.toString());
    return value;
  }
}
