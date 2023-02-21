export enum Sort {
  AlphabeticalAsc = 'alphabetical__asc',
  AlphabeticalDesc = 'alphabetical__desc',
  CountAsc = 'count__asc',
  CountDesc = 'count__desc',
  Nested = 'nested',
}

export type PageSelectorType = 'single' | 'multi' | 'click';

export interface PageTreeItem {
  name: string;
  path: string;
  children: PageTreeItem[];
}
