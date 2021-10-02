import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';

interface Props {
  columns: string[];
  setColumns: (columns: string[]) => void;
}

const allColumns = [
  'Date & Time',
  'Duration',
  'Pages',
  'Start & Exit URL',
  'Device & Viewport',
  'Browser',
];

const ColumnsSchema = Yup.object().shape({
  columns: Yup.array(),
});

export const RecordingsColumns: FC<Props> = ({ columns, setColumns }) => {
  return (
    <Dropdown className='columns' button={<><i className='ri-layout-column-line' /> Columns</>}>
      <Formik
        initialValues={{ columns }}
        validationSchema={ColumnsSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setColumns(values.columns);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          values,
        }) => (
          <form className='filters-columns' onSubmit={handleSubmit}>
            {allColumns.map(column => 
              <Checkbox 
                key={column}
                name='columns'
                onBlur={handleBlur}
                onChange={handleChange}
                value={column}
                checked={values.columns.includes(column)}
              >
                {column}
              </Checkbox>
            )}

            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
          </form>
        )}
      </Formik>
    </Dropdown>
  )
};
