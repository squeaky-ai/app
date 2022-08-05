import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Emoji } from 'components/emoji';
import { Button } from 'components/button';
import { FeedbackSentimentResponseFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: FeedbackSentimentResponseFilters['rating'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<FeedbackSentimentResponseFilters>) => void;
}

const RatingSchemaSchema = Yup.object().shape({
  rating: Yup.string(),
});

export const FiltersRating: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ rating: value?.toString() }}
    validationSchema={RatingSchemaSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(Number(values.rating));
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      handleChange,
      isSubmitting,
      values,
    }) => (
      <form className='filters-rating' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='radio-group'>
            <Radio
              name='rating'
              onBlur={handleBlur}
              onChange={handleChange}
              value='0'
              checked={values.rating === '0'}
            >
              <Emoji height={20} width={20} emoji='emoji-1' />
            </Radio>
            <Radio
              name='rating'
              onBlur={handleBlur}
              onChange={handleChange}
              value='1'
              checked={values.rating === '1'}
            >
              <Emoji height={20} width={20} emoji='emoji-2' />
            </Radio>
            <Radio
              name='rating'
              onBlur={handleBlur}
              onChange={handleChange}
              value='2'
              checked={values.rating === '2'}
            >
              <Emoji height={20} width={20} emoji='emoji-3' />
            </Radio>
            <Radio
              name='rating'
              onBlur={handleBlur}
              onChange={handleChange}
              value='3'
              checked={values.rating === '3'}
            >
              <Emoji height={20} width={20} emoji='emoji-4' />
            </Radio>
            <Radio
              name='rating'
              onBlur={handleBlur}
              onChange={handleChange}
              value='4'
              checked={values.rating === '4'}
            >
              <Emoji height={20} width={20} emoji='emoji-5' />
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
