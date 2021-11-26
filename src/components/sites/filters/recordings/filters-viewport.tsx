import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { valueOrDefaults, numbersOrNull } from 'lib/recordings';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['viewport'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const ViewportSchema = Yup.object().shape({
  minWidth: Yup.number(),
  maxWidth: Yup.number(),
  minHeight: Yup.number(),
  maxHeight: Yup.number(),
});

export const FiltersViewport: FC<Props> = ({ value, onClose, onUpdate }) => (
  <Formik
    initialValues={valueOrDefaults<RecordingsFilters['viewport']>(value)}
    validationSchema={ViewportSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      onUpdate(numbersOrNull(values));
    }}
  >
    {({
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      values,
    }) => (
      <form className='filters-viewport' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='column'>
            <Label>Min. Width</Label>
            <Input 
              name='minWidth' 
              type='number' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.minWidth}
            />
            <p>px</p>
          </div>
          <div className='column'>
            <Label>Max. Width</Label>
            <Input 
              name='maxWidth' 
              type='number' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.maxWidth}
            />
            <p>px</p>
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <Label>Min. Height</Label>
            <Input 
              name='minHeight' 
              type='number' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.minHeight}
            />
            <p>px</p>
          </div>
          <div className='column'>
            <Label>Max. Height</Label>
            <Input 
              name='maxHeight' 
              type='number' 
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.maxHeight}
            />
            <p>px</p>
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
