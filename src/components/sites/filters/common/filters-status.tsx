import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { FiltersStatus as FilterStatus } from 'types/graphql';

interface Props {
  value: FilterStatus | null;
  onClose: VoidFunction;
  onUpdate: (value: FilterStatus | null) => void;
}

const StatusSchema = Yup.object().shape({
  status: Yup.string().oneOf(['New', 'Viewed']),
});

export const FiltersStatus: FC<Props> = ({ value, onClose, onUpdate }) => {
  return (
    <Formik
      initialValues={{ status: value }}
      validationSchema={StatusSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.status);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-status' onSubmit={handleSubmit}>
          <div className='row'>
            <Radio
              name='status'
              onBlur={handleBlur}
              onChange={handleChange}
              value='New'
              checked={values.status === 'New'}
            >
              New
            </Radio>
            <Radio
              name='status'
              onBlur={handleBlur}
              onChange={handleChange}
              value='Viewed'
              checked={values.status === 'Viewed'}
            >
              Viewed
            </Radio>
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
