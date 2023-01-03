import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Relative } from 'components/sites/period/relative';
import { Absolute } from 'components/sites/period/absolute';
import { YYYY_MM_DD_REGEX, TIME_PERIODS } from 'data/common/constants';
import type { TimePeriod } from 'types/common';

interface Props {
  value: TimePeriod;
  onClose: VoidFunction;
  onUpdate: (period: TimePeriod) => void;
}

const DateStringSchema = Yup.string().matches(YYYY_MM_DD_REGEX, 'Date must be formatted as yyyy/mm/dd');

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

export const FiltersDate: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik<{ period: TimePeriod }>
    initialValues={{ period: value || { fromType: 'Before', fromDate: '', betweenFromDate: '', betweenToDate: '' } }}
    validationSchema={DateSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.period);
    }}
  >
    {({
      handleSubmit,
      setFieldValue,
      isSubmitting,
      errors,
      values,
    }) => (
      <div className='period'>
        <form className='filters-date period-form' onSubmit={handleSubmit}>
          <Relative period={values.period} onChange={setFieldValue} />
          <Absolute period={values.period} errors={errors} onChange={setFieldValue} />

          <div className='actions'>
            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
            <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    )}
  </Formik>
);
