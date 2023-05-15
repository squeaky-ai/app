import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import type { EventsCaptureFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: EventsCaptureFilters['source'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<EventsCaptureFilters>) => void;
}

const SourceSchema = Yup.object().shape({
  source: Yup.string().oneOf(['web', 'api']),
});

export const FiltersEventSource: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ source: value }}
    validationSchema={SourceSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.source);
    }}
  >
    {({
      handleBlur,
      handleSubmit,
      setFieldValue,
      isSubmitting,
      values,
    }) => (
      <form className='filters-events-source' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='radio-group'>
            <Radio
              name='source'
              onBlur={handleBlur}
              onChange={() => setFieldValue('source', 'web')}
              value='web'
              checked={values.source === 'web'}
            >
              WEB
            </Radio>
            <Radio
              name='source'
              onBlur={handleBlur}
              onChange={() => setFieldValue('source', 'api')}
              value='api'
              checked={values.source === 'api'}
            >
              API
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
