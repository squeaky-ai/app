export type ValueOf<T> = T[keyof T];

export interface Column {
  label: string;
  width: string;
  disabled: boolean;
  position: number;
}
