import { LineProps, BarProps } from 'recharts';

export type ChartType = 'bar' | 'line' | 'stacked-bar'

export type ChartItemProps = Pick<
  LineProps | BarProps,
  'dataKey' |
  'stroke' |
  'fillOpacity' |
  'strokeWidth' |
  'fill'
>;
