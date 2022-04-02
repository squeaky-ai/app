import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Card } from 'components/card';
import { Input } from 'components/input';
import { Toggle } from 'components/toggle';
import { Radio } from 'components/radio';
import { UploadImage } from 'components/admin/upload-image';
import { Image } from 'components/admin/image';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { exportBlogPost, getInitialValues } from 'lib/admin/blog';
import type { BlogPost } from 'types/graphql';
import type { BlogInput } from 'types/admin';
import type { Props as EditorProps } from 'components/admin/rich-text';

const Editor = dynamic<EditorProps>(
  () => import('./rich-text').then(mod => mod.RichText),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  },
);

interface Props {
  post?: BlogPost;
  images: string[];
  onChange: (post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) => void;
  refetchImages: VoidFunction;
}

const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is requied'),
  tags: Yup.string().required('Tags are requied'),
  author: Yup.string().oneOf(['chris', 'lewis']),
  category: Yup.string().required('Category is requied'),
  draft: Yup.boolean(),
  metaImage: Yup.string().required('Meta image is required'),
  metaDescription: Yup.string().required('Meta description is required'),
  body: Yup.string().required('Body is required'),
});

export const BlogEdit: FC<Props> = ({ post, images, onChange, refetchImages }) => {
  return (
    <Formik<BlogInput>
      initialValues={getInitialValues(post)}
      validationSchema={BlogSchema}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          setSubmitting(false);
          const update = exportBlogPost(values);
          onChange({ ...update, id: post?.id });
        })();
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
        touched,
        values,
        errors,
      }) => {
        return (
          <Card className='create-blog-post'>
            <h5>Create Blog Post</h5>

            <div className='grid'>
              <form onSubmit={handleSubmit}>
                <div className='input-group'>
                  <div>
                    <Label htmlFor='title'>Title</Label>
                    <Input 
                      type='text' 
                      name='title' 
                      placeholder='e.g. Are cats really lizards?' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      invalid={touched.title && !!errors.title}
                    />
                    <span className='validation'>{errors.title}</span>
                  </div>
                  <div>
                    <Label htmlFor='category'>Category</Label>
                    <Input 
                      type='text'
                      name='category'
                      placeholder='e.g. Development' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      invalid={touched.category && !!errors.category}
                    />
                    <span className='validation'>{errors.category}</span>
                  </div>
                </div>

                <div className='input-group'>
                  <div>
                    <Label className='hint' htmlFor='tags'>Tags <i>(Comma seperated list)</i></Label>
                    <Input 
                      type='text' 
                      name='tags' 
                      placeholder='e.g. Product, UX, Engineering' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tags}
                      invalid={touched.tags && !!errors.tags}
                    />
                    <span className='validation'>{errors.tags}</span>
                  </div>
                  <div>
                    <Label htmlFor='author'>Author</Label>
                    <Select name='author' onChange={handleChange} value={values.author}>
                      <Option value='chris'>Chris Pattison</Option>
                      <Option value='lewis'>Lewis Monteith</Option>
                    </Select>    
                  </div>
                </div>

                <Toggle checked={values.draft} name='draft' onChange={(event) => setFieldValue('draft', event.target.checked)}>
                  Draft
                </Toggle>

                <Label htmlFor='metaImage'>Meta Image</Label>
                <div className='images'>
                  {images.map(image => (
                    <Radio 
                      key={image}
                      name='metaImage'
                      value={image} 
                      onChange={handleChange}
                      className={classnames('image-container', { selected: values.metaImage === image })}
                    >
                      <Image path={image} refetchImages={refetchImages} />
                    </Radio>
                  ))}
                  <UploadImage refetchImages={refetchImages} />
                </div>


                <Label htmlFor='metaDescription'>Meta Description</Label>
                <TextArea
                  name='metaDescription' 
                  placeholder='e.g. Project Managers HATE this man. Find out how he delivers value with this one simple trick.'
                  rows={3}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.metaDescription}
                  invalid={touched.metaDescription && !!errors.metaDescription}
                />
                <span className='validation'>{errors.metaDescription}</span>

                <Label htmlFor='body'>Body</Label>
                <Editor 
                  value={values.body}
                  onChange={(value) => setFieldValue('body', value)}
                  refetchImages={refetchImages}
                />

                <Button className='primary submit' type='submit'>
                  {post ? 'Update Post' : 'Create Post'}
                </Button>
              </form>
            </div>
          </Card>
        );
      }}
    </Formik>
  );
};