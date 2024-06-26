export enum Preference {
  RECORDINGS_DELETED_SKIP_PROMPT = 'RECORDINGS_DELETED_SKIP_PROMPT',
  RECORDINGS_PLAYER_DELETED_SKIP_PROMPT = 'RECORDINGS_PLAYER_DELETED_SKIP_PROMPT',
  RECORDINGS_COLUMNS = 'RECORDINGS_COLUMNS::V2',
  EVENTS_VISIBILITY_TYPES = 'EVENTS_VISIBILITY_TYPES',
  EVENTS_OPTIONS_TYPES = 'EVENTS_OPTIONS_TYPES',
  VISITORS_COLUMNS = 'VISITORS_COLUMNS',
  VISITORS_LINKED_DATA_HIDE = 'VISITORS_LINKED_DATA_HIDE',
  NPS_COLUMNS = 'NPS_COLUMNS',
  EVENT_STATS_COLUMNS = 'EVENT_STATS_COLUMNS',
  SENTIMENT_COLUMNS = 'SENTIMENT_COLUMNS',
  SIDEBAR_CLOSED = 'SIDEBAR_CLOSED',
  SIDEBAR_COLLAPSED = 'SIDEBAR_COLLAPSED',
  ADMIN_USERS_COLUMNS = 'ADMIN_USERS_COLUMNS',
  ADMIN_SITES_COLUMNS = 'ADMIN_SITES_COLUMNS',
  EVENTS_CAPTURE_DELETED_SKIP_PROMPT = 'EVENTS_CAPTURE_DELETED_SKIP_PROMPT',
  EVENTS_GROUP_DELETED_SKIP_PROMPT = 'EVENTS_GROUP_DELETED_SKIP_PROMPT',
  PAGE_SELECTOR_SORT = 'PAGE_SELECTOR_SORT',
  TIMEZONE = 'TIMEZONE',
}

export class Preferences {
  public static getString(key: Preference): string {
    const value = localStorage.getItem(`preferences::${key}`);
    return value;
  }

  public static getBoolean(key: Preference): boolean {
    const value = localStorage.getItem(`preferences::${key}`);
    return value === 'true';
  }

  public static getArray<T>(key: Preference): T[] {
    const value = localStorage.getItem(`preferences::${key}`);
    return value ? JSON.parse(value) : [];
  }

  public static setString(key: Preference, value: string): string {
    localStorage.setItem(`preferences::${key}`, value);
    return value;
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

  public static delete(key: Preference): void {
    localStorage.removeItem(`preferences::${key}`);
  }

  public static exists(key: Preference): boolean {
    return localStorage.getItem(`preferences::${key}`) === undefined;
  }
}
