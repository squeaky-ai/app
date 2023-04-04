import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Input } from 'components/input';
import { Tag } from 'components/tag';
import { useTags } from 'hooks/use-tags';
import { READ_ONLY, SUPER_USER } from 'data/teams/constants';
import { tagCreate, tagRemove } from 'lib/api/graphql';
import type { Recording, Tag as ITag, Team } from 'types/graphql';

interface Props {
  member?: Team;
  recording: Recording;
}

const TagSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
});

export const SidebarTags: FC<Props> = ({ member, recording }) => {
  const ref = React.useRef<HTMLFormElement>(null);

  const router = useRouter();
  const [focus, setFocus] = React.useState<boolean>(false);

  const { tags } = useTags();

  const siteId = router.query.site_id + '';

  const handleTagRemove = async (tag: ITag) => {
    await tagRemove({ 
      siteId,
      recordingId: recording.id, 
      tagId: tag.id 
    });
  };

  return (
    <>
      <h5>Tags</h5>
      <div className='tags'>
        <p>Type in the input below to create a new tag or choose from your existing tags.</p>
        <div className='tag-state'>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={TagSchema}
            onSubmit={(values, { setValues }) => {
              (async () => {
                // This gets fired if they hit enter and create a new tag
                await tagCreate({
                  siteId,
                  recordingId: recording.id, 
                  name: values.name.trim(),
                });

                setValues({ name: '' });
                setFocus(false);
              })();
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              setValues,
              values,
            }) => {
              const results = tags
                .filter(t => {
                  const allRecordingTagNames = recording.tags.map(tag => tag.name.toLowerCase());
                  return !allRecordingTagNames.includes(t.name.toLowerCase())
                })
                .sort((a, b) => a.name.localeCompare(b.name));

              const handleTagClick = async (event: React.MouseEvent<HTMLDivElement>) => {
                event.preventDefault();

                const element = event.target as HTMLElement;

                await tagCreate({
                  siteId,
                  recordingId: recording.id, 
                  name: element.innerText.trim(),
                });

                setValues({ name: '' });
              };

              const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
                handleBlur(event);
                // Give the tag enough time to be clicked
                setTimeout(() => setFocus(false), 100); 
              };

              const onInputFocus = () => {
                setFocus(true);
              };

              return (
                <form ref={ref} onSubmit={handleSubmit}>
                  <Input
                    name='name' 
                    type='text' 
                    autoComplete='off'
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                    onChange={handleChange}
                    placeholder='Add tag ...'
                    value={values.name}
                    unauthorized={[READ_ONLY, SUPER_USER].includes(member?.role)}
                  />

                  <div className={classnames('tag-results', { show: focus })}>
                    <p>Select a tag or create new one</p>
                    <ul>
                      {results.map(tag => (
                        <li key={tag.id}>
                          <Tag className='secondary' onClick={handleTagClick}>
                            {tag.name}
                          </Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
              );
            }}
          </Formik>
          <div className='tag-list'>
            {recording.tags.map(tag => (
              <Tag 
                className='primary' 
                buttonProps={{ unauthorized: [READ_ONLY, SUPER_USER].includes(member?.role) }} 
                handleDelete={() => handleTagRemove(tag)} key={tag.id}
              >
                {tag.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
