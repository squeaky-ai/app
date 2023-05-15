import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { EventTag } from 'components/sites/events/event-tag';
import { EventsCaptureType } from 'types/events';

interface Props {
  value: number[];
  onClose: VoidFunction;
  onUpdate: (value: number[]) => void;
}

const TypeSchema = Yup.object().shape({
  types: Yup.array(Yup.number().required()),
});

export const FiltersEventsType: FC<Props> = ({ value, onClose, onUpdate }) => {

  return (
    <Formik
      initialValues={{ types: value }}
      validationSchema={TypeSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.types);
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        setFieldValue,
      }) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(event.target.value);

          event.target.checked
            ? setFieldValue('types', [...values.types, value])
            : setFieldValue('types', values.types.filter(v => v !== value));
        };

        return (
          <form className='filters-event-types' onSubmit={handleSubmit}>
            <div className='row event-types'>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.PageVisit}
                checked={values.types.includes(EventsCaptureType.PageVisit)}
              >
                <EventTag type={EventsCaptureType.PageVisit} />
              </Checkbox>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.TextClick}
                checked={values.types.includes(EventsCaptureType.TextClick)}
              >
                <EventTag type={EventsCaptureType.TextClick} />
              </Checkbox>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.SelectorClick}
                checked={values.types.includes(EventsCaptureType.SelectorClick)}
              >
                <EventTag type={EventsCaptureType.SelectorClick} />
              </Checkbox>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.UtmParameters}
                checked={values.types.includes(EventsCaptureType.UtmParameters)}
              >
                <EventTag type={EventsCaptureType.UtmParameters} />
              </Checkbox>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.Error}
                checked={values.types.includes(EventsCaptureType.Error)}
              >
                <EventTag type={EventsCaptureType.Error} />
              </Checkbox>
              <Checkbox 
                name='types'
                onBlur={handleBlur}
                onChange={handleChange}
                value={EventsCaptureType.Custom}
                checked={values.types.includes(EventsCaptureType.Custom)}
              >
                <EventTag type={EventsCaptureType.Custom} />
              </Checkbox>
            </div>

            <div className='actions'>
              <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
              <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )
      }}
    </Formik>
  );
};
