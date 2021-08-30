export enum Preference {
  RECORDINGS_DELETED_SKIP_PROMPT = 'RECORDINGS_DELETED_SKIP_PROMPT',
  RECORDINGS_PLAYER_DELETED_SKIP_PROMPT = 'RECORDINGS_PLAYER_DELETED_SKIP_PROMPT',
}

export class Preferences {
  public static get(key: Preference): boolean {
    const value = localStorage.getItem(`preferences::${key}`);
    return value === 'true';
  }

  public static set(key: Preference, value: boolean): boolean {
    localStorage.setItem(`preferences::${key}`, value.toString());
    return value;
  }
}
