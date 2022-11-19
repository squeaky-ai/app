import { LineProps, BarProps, AreaProps } from 'recharts';

export type ChartType = 'bar' | 'line' | 'area';

export type ChartItemProps = Pick<
  LineProps | BarProps | AreaProps,
  'dataKey' |
  'stroke' |
  'fillOpacity' |
  'strokeWidth' |
  'fill'
>;
