import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['bookmarked'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const BookmarkedSchema = Yup.object().shape({
  boomarked: Yup.boolean(),
});

export const FiltersBookmarked: FC<Props> = ({ value, onClose, onUpdate }) => {
  return (
    <Formik
      initialValues={{ bookmarked: value }}
      validationSchema={BookmarkedSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.bookmarked);
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        values,
      }) => (
        <form className='filters-bookmarked' onSubmit={handleSubmit}>
          <div className='row'>
            <Checkbox
              name='boomarked'
              onBlur={handleBlur}
              onChange={() => setFieldValue('bookmarked', true)}
              value='true'
              checked={values.bookmarked === true}
            >
              Bookmarked
            </Checkbox>
            <Checkbox
              name='boomarked'
              onBlur={handleBlur}
              onChange={() => setFieldValue('bookmarked', false)}
              value='false'
              checked={values.bookmarked === false}
            >
              Not bookmarked
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
