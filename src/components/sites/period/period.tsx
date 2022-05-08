import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { PeriodLabel } from 'components/sites/period/period-label';
import { Relative } from 'components/sites/period/relative';
import { Absolute } from 'components/sites/period/absolute';
import { TIME_PERIODS } from 'data/common/constants';
import type { TimePeriod, RelativeTime, AbsoluteTime } from 'types/common';

interface Props {
  period: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

enum PeriodType {
  Relative,
  Absolute,
}

const getRelativePeriod = (period: TimePeriod): RelativeTime => (
  TIME_PERIODS.find(t => t.key === period)?.key
);

const getAbsolutePeriod = (period: TimePeriod): AbsoluteTime => {
  const relative = TIME_PERIODS.find(t => t.key === period);

  return relative
    ? null
    : period as AbsoluteTime;
};

export const Period: FC<Props> = ({ period, onChange }) => {
  const ref = React.useRef<Dropdown>(null);

  const [openPeriod, setOpenPeriod] = React.useState<PeriodType | null>(null);

  const handleFilterChange = (period: PeriodType): void => {
    setOpenPeriod(openPeriod === period ? null : period);
  };

  const handleFilterClose = () => {
    setOpenPeriod(null);
    if (ref.current) ref.current.close();
  };

  const handleDateChange = (period: TimePeriod) => {
    onChange(period);
    handleFilterClose();
  };

  return (
    <div className='period'>
      <Dropdown ref={ref} button={<><Icon name='calendar-line' /> <b>Period:</b> <PeriodLabel period={period} /></>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(PeriodType.Relative)} className={classnames({ open: openPeriod === PeriodType.Relative})}>
          <Icon name='arrow-drop-left-line' />
          Relative
        </Button>
        <Button onClick={() => handleFilterChange(PeriodType.Absolute)} className={classnames({ open: openPeriod === PeriodType.Absolute})}>
          <Icon name='arrow-drop-left-line' />
          Absolute
        </Button>

        <div className={classnames('popout filters', { open: openPeriod !== null })}>
          {openPeriod === PeriodType.Relative && (
            <>
              <Label>Relative</Label>
              <Relative date={getRelativePeriod(period)} onClose={handleFilterClose} onChange={handleDateChange} />
            </>
          )}
          {openPeriod === PeriodType.Absolute && (
            <>
              <Label>Absolute</Label>
              <Absolute date={getAbsolutePeriod(period)} onClose={handleFilterClose} onChange={handleDateChange} />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
