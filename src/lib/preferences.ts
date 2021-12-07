export enum Preference {
  RECORDINGS_DELETED_SKIP_PROMPT = 'RECORDINGS_DELETED_SKIP_PROMPT',
  RECORDINGS_PLAYER_DELETED_SKIP_PROMPT = 'RECORDINGS_PLAYER_DELETED_SKIP_PROMPT',
  RECORDINGS_COLUMNS = 'RECORDINGS_COLUMNS',
  ACTIVITY_SHOW_TYPES = 'ACTIVITY_SHOW_TYPES',
  VISITORS_COLUMNS = 'VISITORS_COLUMNS',
  VISITORS_LINKED_DATA_HIDE = 'VISITORS_LINKED_DATA_HIDE',
  NPS_COLUMNS = 'NPS_COLUMNS',
  SIDEBAR_CLOSED = 'SIDEBAR_CLOSED',
  DARK_MODE_ENABLED = 'DARK_MODE_ENABLED',
}

export class Preferences {
  public static getBoolean(key: Preference): boolean {
    const value = localStorage.getItem(`preferences::${key}`);
    return value === 'true';
  }

  public static getArray<T>(key: Preference): T[] {
    const value = localStorage.getItem(`preferences::${key}`);
    return value ? JSON.parse(value) : [];
  }

  public static setBoolean(key: Preference, value: boolean): boolean {
    localStorage.setItem(`preferences::${key}`, value.toString());
    return value;
  }

  public static setArray<T>(key: Preference, value: T[]): T[] {
    localStorage.setItem(`preferences::${key}`, JSON.stringify(value));
    return value;
  }

  public static getRaw(key: Preference): string {
    return localStorage.getItem(`preferences::${key}`);
  }
}
