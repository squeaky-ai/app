import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['starred'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const StarredSchema = Yup.object().shape({
  starred: Yup.boolean(),
});

export const FiltersStarred: FC<Props> = ({ value, onClose, onUpdate }) => {
  return (
    <Formik
      initialValues={{ starred: value }}
      validationSchema={StarredSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.starred);
      }}
    >
      {({
        handleBlur,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-starred' onSubmit={handleSubmit}>
          <div className='row'>
            <Checkbox
              name='starred'
              onBlur={handleBlur}
              onChange={() => setFieldValue('starred', true)}
              value='true'
              checked={values.starred === true}
            >
              Starred
            </Checkbox>
            <Checkbox
              name='starred'
              onBlur={handleBlur}
              onChange={() => setFieldValue('starred', false)}
              value='false'
              checked={values.starred === false}
            >
              Unstarred
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
