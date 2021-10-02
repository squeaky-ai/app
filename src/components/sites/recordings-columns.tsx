import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';
import { defaultColumns } from 'lib/recordings';
import type { Column } from 'types/recording';

interface Props {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

const ColumnsSchema = Yup.object().shape({
  columns: Yup.array(),
});

export const RecordingsColumns: FC<Props> = ({ columns, setColumns }) => {
  const columnNames = columns.map(c => c.name);

  return (
    <Dropdown className='columns' button={<><i className='ri-layout-column-line' /> Columns</>}>
      <Formik
        initialValues={{ columns: columnNames }}
        validationSchema={ColumnsSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const update = values.columns.map(c => defaultColumns.find(d => d.name === c));
          setColumns(update);
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
            {defaultColumns.map(column => 
              <Checkbox 
                key={column.name}
                name='columns'
                onBlur={handleBlur}
                onChange={handleChange}
                value={column.name}
                checked={values.columns.includes(column.name)}
              >
                {column.label}
              </Checkbox>
            )}

            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
          </form>
        )}
      </Formik>
    </Dropdown>
  )
};
