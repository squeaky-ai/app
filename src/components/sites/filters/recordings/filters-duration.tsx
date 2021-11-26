import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { Input } from 'components/input';
import { toTimeString, fromTimeString } from 'lib/dates';
import { MM_SS_REGEX } from 'data/common/constants';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['duration'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const TimeStampSchema = Yup.string().matches(MM_SS_REGEX, 'Timestamp must be formatted as 00:00');

const DurationSchema = Yup.object().shape({
  rangeType: Yup.string().oneOf(['From', 'Between']),
  fromType: Yup.string().oneOf(['GreaterThan', 'LessThan']),
  fromDuration: TimeStampSchema.when('rangeType', { is: 'From', then: TimeStampSchema }),
  betweenFromDuration: TimeStampSchema.when('rangeType', { is: 'Between', then: TimeStampSchema.required() }),
  betweenToDuration: TimeStampSchema.when('rangeType', { is: 'Between', then: TimeStampSchema.required() }),
});


export const FiltersDuration: FC<Props> = ({ value, onClose, onUpdate }) => {
  const formatAsTimeString = (value?: string) => {
    return value ? fromTimeString(`00:${value}`) : null
  };

  const formatTimeString = (value: number) => value ? toTimeString(value).slice(3) : '';

  const initalValues = {
    fromDuration: formatTimeString(value.fromDuration),
    betweenFromDuration: formatTimeString(value.betweenFromDuration),
    betweenToDuration: formatTimeString(value.betweenToDuration),
    rangeType: value.rangeType,
    fromType: value.fromType,
  };
  
  return (
    <Formik
      initialValues={initalValues}
      validationSchema={DurationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        onUpdate({
          fromDuration: formatAsTimeString(values.fromDuration),
          betweenFromDuration: formatAsTimeString(values.betweenFromDuration),
          betweenToDuration: formatAsTimeString(values.betweenToDuration),
          rangeType: values.rangeType,
          fromType: values.fromType,
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
        <form className='filters-duration' onSubmit={handleSubmit}>
          <div className='row'>
            <Radio 
              name='rangeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value='From'
              checked={values.rangeType === 'From'}
            />
            <Select name='fromType' onChange={handleChange} value={values.fromType}>
              <Option value='GreaterThan'>Greater than</Option>
              <Option value='LessThan'>Less than</Option>
            </Select>
            <Input 
              placeholder='00:00' 
              className='time' 
              name='fromDuration' 
              type='text' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.fromDuration}
              invalid={touched.fromDuration && !!errors.fromDuration}
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
            <Input 
              placeholder='00:00' 
              className='time' 
              name='betweenFromDuration' 
              type='text' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.betweenFromDuration}
              invalid={touched.betweenFromDuration && !!errors.betweenFromDuration}
            />
            <p>and</p>
            <Input 
              placeholder='00:00' 
              className='time' 
              name='betweenToDuration' 
              type='text' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.betweenToDuration}
              invalid={touched.betweenToDuration && !!errors.betweenToDuration}
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
};
