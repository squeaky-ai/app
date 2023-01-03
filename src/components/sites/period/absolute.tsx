import React from 'react';
import type { FC } from 'react';
import { Radio } from 'components/radio';
import { DatePicker } from 'components/date-picker';
import { Select, Option } from 'components/select';
import { TIME_PERIODS } from 'data/common/constants';
import type { FormikErrors } from 'formik';
import type { AbsoluteTime, TimePeriod, ValueOf } from 'types/common';

interface Props {
  period: TimePeriod;
  errors: FormikErrors<{ period: TimePeriod }>;
  onChange: (field: string, value: AbsoluteTime, shouldValidate?: boolean) => void;
}

const isAbsolutePeriod = (period: TimePeriod): period is AbsoluteTime => (
  !TIME_PERIODS.find(t => t.key === period)
);

const isAbsoluteErrors = (errors: FormikErrors<{ period: TimePeriod }>): errors is FormikErrors<{ period: AbsoluteTime }> => (
  typeof errors.period === 'object'
);

export const Absolute: FC<Props> = ({ period, errors, onChange }) => {
  const absoluteTime = isAbsolutePeriod(period);
  const absoluteErrors = isAbsoluteErrors(errors);

  const getValue = (value: keyof AbsoluteTime): string => {
    return absoluteTime
      ? period[value]
      : '';
  };

  const getError = (value: keyof AbsoluteTime) => {
    return absoluteErrors
      ? errors.period[value]
      : null;
  };

  const handleChange = (key: keyof AbsoluteTime, value: ValueOf<AbsoluteTime>) => {
    onChange('period', { ...period as AbsoluteTime, [key]: value });
  };

  const handleAbsoluteToggle = () => {
    // When toggling the absolute dates on, set all the
    // defaults
    onChange('period', {
      fromType: 'Before',
      betweenFromDate: '',
      betweenToDate: '',
      fromDate: '',
    });
  };

  const handleFromTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange('fromType', event.target.value as AbsoluteTime['fromType']);
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('fromDate', event.target.value);
  };

  const handleBetweenFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('betweenFromDate', event.target.value);
  };

  const handleBetweenToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('betweenToDate', event.target.value);
  };

  return (
    <div className='absolute'>
      <div className='row from-type'>
        <Radio
          readOnly
          checked={absoluteTime}
          onChange={handleAbsoluteToggle}
        />
        <Select name='fromType' onChange={handleFromTypeChange} value={getValue('fromType')} disabled={!absoluteTime}>
          <Option value='Before'>Before</Option>
          <Option value='After'>After</Option>
          <Option value='Between'>Between</Option>
        </Select>
      </div>

      {['Before', 'After', ''].includes(getValue('fromType')) && (
        <div className='row single-date'>
          <DatePicker
            onChange={handleFromDateChange}
            value={getValue('fromDate')}
            disabled={!absoluteTime}
            invalid={!!getError('fromDate')}
          />
        </div>
      )}

      {getValue('fromType') === 'Between' && (
        <div className='row multi-date'>
          <DatePicker 
            onChange={handleBetweenFromDateChange}
            value={getValue('betweenFromDate')}
            invalid={!!getError('betweenFromDate')}
          />
          <p>and</p>
          <DatePicker 
            onChange={handleBetweenToDateChange}
            value={getValue('betweenToDate')}
            invalid={!!getError('betweenToDate')}
          />
        </div>
      )}
    </div>
  );
};
