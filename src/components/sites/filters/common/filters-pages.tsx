import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { PageSelector } from 'components/sites/page-selector/page-selector';
import { usePages } from 'hooks/use-pages';
import { getDateRange } from 'lib/dates';
import type { TimePeriod } from 'types/common';

interface Props {
  label: string;
  value: string[];
  period: TimePeriod;
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
}

const PagesSchema = Yup.object().shape({
  pages: Yup.array(),
});

export const FiltersPages: FC<Props> = ({ label, value, period, onClose, onUpdate }) => {
  const { pages, loading } = usePages({ 
    range: getDateRange(period)
  });

  return (
    <Formik
      initialValues={{ pages: value }}
      validationSchema={PagesSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.pages);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        values,
      }) => (
        <form className='filters-pages' onSubmit={handleSubmit}>
          {loading && <Spinner />}
          <PageSelector
            compact
            type='multi'
            label={label}
            pages={pages}
            selected={values.pages}
            handleChange={handleChange}
            setSelected={pages => setFieldValue('pages', pages.map(p => p.url))}
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
