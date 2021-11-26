export interface Column {
  name: string;
  label: string;
  width: string;
  disabled: boolean;
}

export interface ExternalAttributes {
  id: string;
  name?: string;
  email?: string;
  [key: string]: string;
}
