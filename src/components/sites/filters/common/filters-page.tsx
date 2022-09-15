import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { PageSelector } from 'components/sites/page-selector';
import { usePages } from 'hooks/use-pages';
import type { TimePeriod } from 'types/common';
import { getDateRange } from 'lib/dates';

interface Props {
  label: string;
  value: string | null;
  period: TimePeriod;
  onClose: VoidFunction;
  onUpdate: (value: string) => void;
}

const PageSchema = Yup.object().shape({
  page: Yup.string(),
});

export const FiltersPage: FC<Props> = ({ label, value, period, onClose, onUpdate }) => {  
  const { pages, loading } = usePages({ 
    range: getDateRange(period)
  });

  return (
    <Formik
      initialValues={{ page: value }}
      validationSchema={PageSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.page);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-pages' onSubmit={handleSubmit}>
          {loading && <Spinner />}
          <PageSelector
            type='single'
            label={label}
            pages={pages}
            selected={values.page}
            handleChange={handleChange}
          />
          <div className='actions'>
            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
            <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
