import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['rageClicked'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const RageClickedSchema = Yup.object().shape({
  rageClicked: Yup.boolean(),
});

export const FiltersRageClicked: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ rageClicked: value }}
    validationSchema={RageClickedSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.rageClicked);
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      values,
    }) => (
      <form className='filters-rage-clicked' onSubmit={handleSubmit}>
        <div className='row'>
          <Checkbox
            name='boomarked'
            onBlur={handleBlur}
            onChange={() => setFieldValue('rageClicked', true)}
            value='true'
            checked={values.rageClicked === true}
          >
            Yes
          </Checkbox>
          <Checkbox
            name='boomarked'
            onBlur={handleBlur}
            onChange={() => setFieldValue('rageClicked', false)}
            value='false'
            checked={values.rageClicked === false}
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
