import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { FeedbackNpsGroup, FeedbackNpsResponseFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: FeedbackNpsResponseFilters['outcomeType'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<FeedbackNpsResponseFilters>) => void;
}

const OutcomeTypeSchemaSchema = Yup.object().shape({
  outcomeType: Yup.string(),
});

export const FiltersOutcomeType: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ outcomeType: value }}
    validationSchema={OutcomeTypeSchemaSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.outcomeType);
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      handleChange,
      isSubmitting,
      values,
    }) => (
      <form className='filters-outcome-type' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='radio-group'>
            <Radio
              name='outcomeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value={FeedbackNpsGroup.Promoter}
              checked={values.outcomeType === FeedbackNpsGroup.Promoter}
            >
              Promoters
            </Radio>
            <Radio
              name='outcomeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value={FeedbackNpsGroup.Passive}
              checked={values.outcomeType === FeedbackNpsGroup.Passive}
            >
              Passives
            </Radio>
            <Radio
              name='outcomeType'
              onBlur={handleBlur}
              onChange={handleChange}
              value={FeedbackNpsGroup.Detractor}
              checked={values.outcomeType === FeedbackNpsGroup.Detractor}
            >
              Detractors
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
