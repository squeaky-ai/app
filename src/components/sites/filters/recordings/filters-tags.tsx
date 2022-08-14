import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Tag } from 'components/tag';
import { useTags } from 'hooks/use-tags';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['tags'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const TagsSchema = Yup.object().shape({
  tags: Yup.array(),
});

export const FiltersTags: FC<Props> = ({ value, onClose, onUpdate }) => {
  const [search, setSearch] = React.useState<string>('');

  const { tags, loading } = useTags();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const results = tags
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.length - b.name.length);

  return (
    <Formik
      initialValues={{ tags: value.map(v => v.toString()) }}
      validationSchema={TagsSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.tags.map(t => Number(t)));
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-tags' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='search' role='search' aria-label='Filter recordings'>
              <Input 
                type='search' 
                placeholder='Search...' 
                onChange={handleSearch} 
                autoComplete='off'
              />
              <Icon name='search-line' /> 
            </div>
          </div>
          <div className='row tags'>
            {loading && <Spinner />}

            {results.map(tag => (
              <Checkbox 
                key={tag.id}
                name='tags'
                onBlur={handleBlur}
                onChange={handleChange}
                value={tag.id}
                checked={values.tags.includes(tag.id)}
              >
                <Tag className='primary'>{tag.name}</Tag>
              </Checkbox>
            ))}
          </div>

          <div className='actions'>
            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
            <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
