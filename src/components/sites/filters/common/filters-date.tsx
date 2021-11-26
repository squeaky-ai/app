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
import type { FiltersDate as DateFilter } from 'types/graphql';

interface Props {
  value: DateFilter;
  onClose: VoidFunction;
  onUpdate: (value: DateFilter) => void;
}

const DateStringSchema = Yup.string().matches(DD_MM_YYYY_REGEX, 'Date must be formatted as dd/mm/yyyy');

const DateSchema = Yup.object().shape({
  rangeType: Yup.string().oneOf(['From', 'Between']),
  fromType: Yup.string().oneOf(['Before', 'After']),
  fromDate: DateStringSchema.when('rangeType', { is: 'From', then: DateStringSchema.required() }),
  betweenFromDate: DateStringSchema.when('rangeType', { is: 'Between', then: DateStringSchema.required() }),
  betweenToDate: DateStringSchema.when('rangeType', { is: 'Between', then: DateStringSchema.required() }),
});

export const FiltersDate: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={valueOrDefaults<DateFilter>(value)}
    validationSchema={DateSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);

      onUpdate({
        rangeType: values.rangeType,
        fromType: values.fromType,
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
            name='rangeType'
            onBlur={handleBlur}
            onChange={handleChange}
            value='From'
            checked={values.rangeType === 'From'}
          />
          <Select name='fromType' onChange={handleChange} value={values.fromType}>
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
            name='rangeType'
            onBlur={handleBlur}
            onChange={handleChange}
            value='Between'
            checked={values.rangeType === 'Between'}
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
