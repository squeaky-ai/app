import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { DatePicker } from 'components/date-picker';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import type { AbsoluteTime } from 'types/common';

interface Props {
  date?: AbsoluteTime;
  onClose: VoidFunction;
  onChange: (range: AbsoluteTime) => void;
}

const AbsoluteSchema = Yup.object().shape({
  fromType: Yup.string().oneOf(['Before', 'After', 'Between']),
  fromDate: Yup.string(),
  betweenFromDate: Yup.string(),
  betweenToDate: Yup.string(),
});

export const Absolute: FC<Props> = ({ date, onClose, onChange }) => {
  return (
    <div className='absolute'>
      <Formik
        initialValues={date || { fromType: '', fromDate: '', betweenFromDate: '', betweenToDate: '' }}
        validationSchema={AbsoluteSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            setSubmitting(false);
            onChange(values as AbsoluteTime);
          })();
        }}
      >
        {({
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <Radio 
                name='fromType'
                onBlur={handleBlur}
                onChange={handleChange}
                value='Before'
                checked={values.fromType ? values.fromType !== 'Between' : false}
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
                name='fromType'
                onBlur={handleBlur}
                onChange={handleChange}
                value='Between'
                checked={values.fromType === 'Between'}
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
              <Button type='submit' className='primary'>Apply</Button>
              <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
