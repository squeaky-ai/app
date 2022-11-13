export enum FeatureFlag {
  CHEESE_LOADER = 'CHEESE_LOADER',
  NEW_SITE_CREATE = 'NEW_SITE_CREATE',
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
