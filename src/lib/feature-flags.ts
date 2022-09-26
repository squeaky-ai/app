export enum FeatureFlag {
  CHEESE_LOADER = 'CHEESE_LOADER',
  HEATMAP_FLAMEGRAPH = 'HEATMAP_FLAMEGRAPH',
  HEATMAP_CURSORS = 'HEATMAP_CURSORS',
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
