export enum FeatureFlag {
  CHEESE_LOADER = 'CHEESE_LOADER',
  DASHBOARD_V2 = 'DASHBOARD_V2',
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
