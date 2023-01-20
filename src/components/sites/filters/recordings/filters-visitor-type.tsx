import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { FiltersVisitorType as FilterVisitorType } from 'types/graphql';

interface Props {
  value: FilterVisitorType | null;
  onClose: VoidFunction;
  onUpdate: (value: FilterVisitorType | null) => void;
}

const VisitorTypeSchema = Yup.object().shape({
  type: Yup.string().oneOf(['New', 'Existing']),
});

export const FiltersVisitorType: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={{ type: value }}
    validationSchema={VisitorTypeSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(values.type);
    }}
  >
    {({
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      values,
    }) => (
      <form className='filters-visitor-type' onSubmit={handleSubmit}>
        <div className='row'>
          <Radio
            name='type'
            onBlur={handleBlur}
            onChange={handleChange}
            value='New'
            checked={values.type === 'New'}
          >
            New
          </Radio>
          <Radio
            name='type'
            onBlur={handleBlur}
            onChange={handleChange}
            value='Existing'
            checked={values.type === 'Existing'}
          >
            Returning
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
