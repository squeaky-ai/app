import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import type { Filters } from 'types/recording';
import type { ValueOf } from 'types/common';

interface Props {
  value: Filters['devices'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<Filters>) => void;
}

const DevicesSchema = Yup.object().shape({
  devices: Yup.array(),
});

export const FiltersDevice: FC<Props> = ({ value, onClose, onUpdate }) => {
  return (
    <Formik
      initialValues={{ devices: value }}
      validationSchema={DevicesSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.devices);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-device' onSubmit={handleSubmit}>
          <div className='row'>
            <Checkbox
              name='devices'
              onBlur={handleBlur}
              onChange={handleChange}
              value='Computer'
              checked={values.devices.includes('Computer')}
            >
              Desktop/Laptop
            </Checkbox>
            <Checkbox
              name='devices'
              onBlur={handleBlur}
              onChange={handleChange}
              value='Mobile'
              checked={values.devices.includes('Mobile')}
            >
              Mobile
            </Checkbox>
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
