import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import type { FeedbackNpsResponseFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: FeedbackNpsResponseFilters['followUpComment'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<FeedbackNpsResponseFilters>) => void;
}

const FollowupSchemaSchema = Yup.object().shape({
  followUpComment: Yup.boolean(),
});

export const FiltersFollowup: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ followUpComment: value }}
    validationSchema={FollowupSchemaSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.followUpComment);
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      setFieldValue,
      isSubmitting,
      values,
    }) => (
      <form className='filters-follow-up-comment' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='radio-group'>
            <Radio
              name='followUpComment'
              onBlur={handleBlur}
              onChange={() => setFieldValue('followUpComment', true)}
              value='true'
              checked={values.followUpComment === true}
            >
              Has comment
            </Radio>
            <Radio
              name='followUpComment'
              onBlur={handleBlur}
              onChange={() => setFieldValue('followUpComment', false)}
              value='false'
              checked={values.followUpComment === false}
            >
              Has no comment
            </Radio>
          </div>
        </div>

        <div className='actions'>
          <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
          <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
        </div>
      </form>
    )}
  </Formik>
);
