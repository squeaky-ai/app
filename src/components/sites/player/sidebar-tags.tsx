import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Tag } from 'components/tag';
import { tagCreate, tagRemove } from 'lib/api/graphql';
import type { Recording, Tag as ITag } from 'types/graphql';
import { useTags } from 'hooks/use-tags';

interface Props {
  recording: Recording;
}

const TagSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
});

enum PageView {
  EMPTY,
  SHOW
}

export const SidebarTags: FC<Props> = ({ recording }) => {
  const ref = React.useRef<HTMLFormElement>(null);

  const router = useRouter();
  const [page, setPage] = React.useState<PageView>(PageView.EMPTY);
  const [focus, setFocus] = React.useState<boolean>(false);

  const { tags } = useTags();

  const siteId = router.query.site_id + '';

  const setShow = () => {
    setPage(PageView.SHOW);
  };

  const handleTagRemove = async (tag: ITag) => {
    await tagRemove({ 
      siteId,
      recordingId: recording.id, 
      tagId: tag.id 
    });
  };

  React.useEffect(() => {
    setPage(recording.tags.length ? PageView.SHOW : PageView.EMPTY);
  }, [recording.tags]);

  return (
    <div className={classnames('tags', { empty: page === PageView.EMPTY })}>
      <div className='create-state'>
        <p>There are no tags for this recording</p>
        <Button className='secondary' onClick={setShow}>+ Add Tag</Button>
      </div>
      <div className='tag-state'>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={TagSchema}
          onSubmit={(values, { setValues }) => {
            (async () => {
              await tagCreate({
                siteId,
                recordingId: recording.id, 
                name: values.name
              });

              setValues({ name: '' });
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
              .filter(t => t.name.toLowerCase().includes(values.name.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name));

            const handleTagClick = async (event: React.MouseEvent<HTMLDivElement>) => {
              event.preventDefault();
              const element = event.target as HTMLElement;

              await tagCreate({
                siteId,
                recordingId: recording.id, 
                name: element.innerText
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
                  onBlur={onInputBlur}
                  onFocus={onInputFocus}
                  onChange={handleChange}
                  placeholder='Add tag ...'
                  value={values.name}
                />
                <p>Hit enter to submit</p>

                <div className={classnames('tag-results', { show: focus && results.length > 0 })}>
                  <ul>
                    {results.map(tag => (
                      <li key={tag.id}>
                        <Tag onClick={handleTagClick}>
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
            <Tag handleDelete={() => handleTagRemove(tag)} key={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
