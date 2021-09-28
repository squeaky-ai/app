import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { DatePicker } from 'components/date-picker';

interface Props {
  onClose: VoidFunction;
}

const DateSchema = Yup.object().shape({
  dateRangeType: Yup.string().oneOf(['From', 'Between']),
  dateFromType: Yup.string().oneOf(['Before', 'After']),
  fromDate: Yup.string(),
  betweenFromDate: Yup.string(),
  betweenToDate: Yup.string(),
});

export const FiltersDate: FC<Props> = ({ onClose }) => {
  return (
    <Formik
      initialValues={{ dateRangeType: null, dateFromType: 'Before', fromDate: '', betweenFromDate: '', betweenToDate: '' }}
      validationSchema={DateSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
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
            />
            <p>and</p>
            <DatePicker 
              name='betweenToDate' 
              type='text' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.betweenToDate}
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
