import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { DatePicker } from 'components/date-picker';
import { DD_MM_YYYY_REGEX } from 'data/common/constants';
import { valueOrDefaults } from 'lib/recordings';
import type { Filters } from 'types/recording';
import type { ValueOf } from 'types/common';

interface Props {
  value: Filters['date'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<Filters>) => void;
}

const DateStringSchema = Yup.string().matches(DD_MM_YYYY_REGEX, 'Date must be formatted as dd/mm/yyyy');

const DateSchema = Yup.object().shape({
  dateRangeType: Yup.string().oneOf(['From', 'Between']),
  dateFromType: Yup.string().oneOf(['Before', 'After']),
  fromDate: DateStringSchema.when('dateRangeType', { is: 'From', then: DateStringSchema.required() }),
  betweenFromDate: DateStringSchema.when('dateRangeType', { is: 'Between', then: DateStringSchema.required() }),
  betweenToDate: DateStringSchema.when('dateRangeType', { is: 'Between', then: DateStringSchema.required() }),
});

export const FiltersDate: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={valueOrDefaults<Filters['date']>(value)}
    validationSchema={DateSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);

      onUpdate({
        dateRangeType: values.dateRangeType,
        dateFromType: values.dateFromType,
        fromDate: values.fromDate || null,
        betweenFromDate: values.betweenFromDate || null,
        betweenToDate: values.betweenToDate || null,
      });
    }}
  >
    {({
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      touched,
      errors,
      values,
    }) => (
      <form className='filters-date' onSubmit={handleSubmit}>
        <div className='row'>
          <Radio 
            name='dateRangeType'
            onBlur={handleBlur}
            onChange={handleChange}
            value='From'
            checked={values.dateRangeType === 'From'}
          />
          <Select name='dateFromType' onChange={handleChange} value={values.dateFromType}>
            <Option value='Before'>Before</Option>
            <Option value='After'>After</Option>
          </Select>
          <DatePicker
            name='fromDate' 
            type='text' 
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.fromDate}
            invalid={touched.fromDate && !!errors.fromDate}
          />
        </div>
        <div className='row'>
          <Radio 
            name='dateRangeType'
            onBlur={handleBlur}
            onChange={handleChange}
            value='Between'
            checked={values.dateRangeType === 'Between'}
          />
          <p>Between</p>
          <DatePicker 
            name='betweenFromDate' 
            type='text' 
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.betweenFromDate}
            invalid={touched.betweenFromDate && !!errors.betweenFromDate}
          />
          <p>and</p>
          <DatePicker 
            name='betweenToDate' 
            type='text' 
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.betweenToDate}
            invalid={touched.betweenToDate && !!errors.betweenToDate}
          />
        </div>

        <div className='actions'>
          <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
          <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
        </div>
      </form>
    )}
  </Formik>
);
