export interface PageStats {
  path: string;
  count: number;
  percentage: number;
}

export interface FocussedPage {
  col: number;
  page: string;
}

export interface JourneyReferrer {
  name: string;
  title: string | React.ReactNode;
  percentage: number;
  direct: boolean;
}
