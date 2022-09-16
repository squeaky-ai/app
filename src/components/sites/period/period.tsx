import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Dropdown } from 'components/dropdown';
import { PeriodLabel } from 'components/sites/period/period-label';
import { Button } from 'components/button';
import { Relative } from 'components/sites/period/relative';
import { Absolute } from 'components/sites/period/absolute';
import { DD_MM_YYYY_REGEX, TIME_PERIODS } from 'data/common/constants';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

const DateStringSchema = Yup.string().matches(DD_MM_YYYY_REGEX, 'Date must be formatted as dd/mm/yyyy');

const AbsoluteSchema = Yup.object().shape({
  fromType: Yup.string().oneOf(['Before', 'After', 'Between']),
  fromDate: DateStringSchema,
  betweenFromDate: DateStringSchema,
  betweenToDate: DateStringSchema,
});

const DateSchema = Yup.object().shape({
  period: Yup.lazy((value: TimePeriod) => {
    return !!TIME_PERIODS.find(t => t.key === value)
      ? Yup.string()
      : AbsoluteSchema;
  })
});

export const Period: FC<Props> = ({ period, onChange }) => {
  const ref = React.useRef<Dropdown>(null);

  const handleFilterClose = () => {
    if (ref.current) ref.current.close();
  };

  const handleDateChange = (period: TimePeriod) => {
    onChange(period);
    handleFilterClose();
  };

  return (
    <div className='period'>
      <Formik
        initialValues={{ period }}
        validationSchema={DateSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            setSubmitting(false);
            handleDateChange(values.period);
          })();
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          errors,
        }) => (
          <form onSubmit={handleSubmit} className='period-form'>
            <Dropdown ref={ref} button={<><Icon name='calendar-line' /> <b>Period:</b> <PeriodLabel period={period} /></>} dropdown-menu='down'>
              <Relative period={values.period} onChange={setFieldValue} />
              <Absolute period={values.period} errors={errors} onChange={setFieldValue} />

              <div className='actions'>
                <Button type='submit' className='primary'>Apply</Button>
                <Button type='button' className='quaternary' onClick={handleFilterClose}>Cancel</Button>
              </div>
            </Dropdown>
          </form>
        )}
      </Formik>
    </div>
  );
};
