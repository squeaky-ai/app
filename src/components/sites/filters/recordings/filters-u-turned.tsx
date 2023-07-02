import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['uTurned'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const UTurnedSchema = Yup.object().shape({
  uTurned: Yup.boolean(),
});

export const FiltersUTurned: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ uTurned: value }}
    validationSchema={UTurnedSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.uTurned);
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      values,
    }) => (
      <form className='filters-u-turned' onSubmit={handleSubmit}>
        <div className='row'>
          <Checkbox
            name='boomarked'
            onBlur={handleBlur}
            onChange={() => setFieldValue('uTurned', true)}
            value='true'
            checked={values.uTurned === true}
          >
            Yes
          </Checkbox>
          <Checkbox
            name='boomarked'
            onBlur={handleBlur}
            onChange={() => setFieldValue('uTurned', false)}
            value='false'
            checked={values.uTurned === false}
          >
            No
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
