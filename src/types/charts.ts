import { LineProps, BarProps } from 'recharts';

export type ChartType = 'bar' | 'line';

export type ChartItemProps = Pick<
  LineProps | BarProps,
  'dataKey' |
  'stroke' |
  'fillOpacity' |
  'strokeWidth' |
  'fill'
>;
