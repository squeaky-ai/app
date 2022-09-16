import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { Input } from 'components/input';
import type { VisitorsFilters } from 'types/visitors';
import type { ValueOf } from 'types/common';

interface Props {
  value: VisitorsFilters['recordings'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<VisitorsFilters>) => void;
}

const RecordingsSchema = Yup.object().shape({
  rangeType: Yup.string().oneOf(['LessThan', 'GreaterThan']),
  count: Yup.number(),
});

export const FiltersRecordings: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={value}
    validationSchema={RecordingsSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values);
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
      <form className='filters-recordings' onSubmit={handleSubmit}>
        <div className='row'>
          <Select name='rangeType' onChange={handleChange} value={values.rangeType}>
            <Option value='GreaterThan'>Greater than</Option>
            <Option value='LessThan'>Less than</Option>
          </Select>
          <Input
            placeholder='e.g. 5'
            name='count' 
            type='number' 
            autoComplete='off'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.count || ''}
            invalid={touched.count && !!errors.count}
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
