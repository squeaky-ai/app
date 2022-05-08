import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { TIME_PERIODS } from 'data/common/constants';
import type { RelativeTime } from 'types/common';

interface Props {
  date?: RelativeTime;
  onClose: VoidFunction;
  onChange: (period: RelativeTime) => void;
}

const relativeDates = TIME_PERIODS.map(t => t.key);

const RelativeSchema = Yup.object().shape({
  date: Yup.string().oneOf(relativeDates, 'Please select a relative date'),
});

export const Relative: FC<Props> = ({ date, onClose, onChange }) => (
  <div className='relative'>
    <Formik
      initialValues={{ date }}
      validationSchema={RelativeSchema}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          setSubmitting(false);
          onChange(values.date);
        })();
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='radio-group'>
            {TIME_PERIODS.map(({ key, name }) => (
              <Radio
                key={key}
                name='date'
                value={key} 
                checked={values.date === key}
                onChange={handleChange}
              >
                {name}
              </Radio>
            ))}
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
