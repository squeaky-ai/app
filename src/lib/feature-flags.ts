export enum FeatureFlag {
  MAGIC_ERASURE = 'MAGIC_ERASURE',
  CHEESE_LOADER = 'CHEESE_LOADER',
  PER_PAGE_ANALYTICS = 'PER_PAGE_ANALYTICS',
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
