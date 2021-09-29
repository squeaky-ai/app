import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { Input } from 'components/input';
import type { Filters } from 'types/recording';
import type { ValueOf } from 'types/common';

interface Props {
  value: Filters['duration'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<Filters>) => void;
}

const DurationSchema = Yup.object().shape({
  durationRangeType: Yup.string().oneOf(['From', 'Between']),
  durationFromType: Yup.string().oneOf(['GreaterThan', 'LessThan']),
  fromDuration: Yup.string(),
  betweenFromDuration: Yup.string(),
  betweenToDuration: Yup.string(),
});


export const FiltersDuration: FC<Props> = ({ value, onClose, onUpdate }) => {
  return (
    <Formik
      initialValues={value}
      validationSchema={DurationSchema}
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
        values,
      }) => (
        <form className='filters-duration' onSubmit={handleSubmit}>
          <div className='row'>
            <Radio 
              name='durationRangeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value='From'
              checked={values.durationRangeType === 'From'}
            />
            <Select name='durationFromType' onChange={handleChange} value={values.durationFromType}>
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
            />
          </div>
          <div className='row'>
            <Radio 
              name='durationRangeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value='Between'
              checked={values.durationRangeType === 'Between'}
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
