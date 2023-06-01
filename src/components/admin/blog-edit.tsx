import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Radio } from 'components/radio';
import { UploadImage } from 'components/admin/upload-image';
import { Image } from 'components/admin/image';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { exportBlogPost, getInitialValues } from 'lib/admin/blog';
import type { BlogPost } from 'types/graphql';
import type { BlogInput } from 'types/admin';

interface Props {
  post?: BlogPost;
  images: string[];
  onChange: (post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) => void;
  refetchImages: VoidFunction;
}

const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  tags: Yup.string().required('Tags are required'),
  author: Yup.string().oneOf(['chris', 'lewis']),
  category: Yup.string().required('Category is required'),
  metaImage: Yup.string().required('Meta image is required'),
  metaDescription: Yup.string().required('Meta description is required'),
  body: Yup.string().required('Body is required'),
  coveringEnabled: Yup.boolean(),
  script: Yup.string(),
});

export const BlogEdit: FC<Props> = ({ post, images, onChange, refetchImages }) => (
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
        <div className='create-blog-post'>
          <div className='grid'>
            <form onSubmit={handleSubmit}>
              <div className='left'>
                <Label htmlFor='body'>Body</Label>
                <TextArea 
                  className='edit-body'
                  name='body'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                />
              </div>
              <div className='right'>
                <div className='input-group'>
                  <div>
                    <Label htmlFor='title'>Title</Label>
                    <Input 
                      type='text' 
                      name='title' 
                      placeholder='e.g. Are cats really lizards?' 
                      autoComplete='off'
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
                      autoComplete='off'
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
                      autoComplete='off'
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
    
                <Label htmlFor='coveringEnabled'>Show &quot;What we&apos;ll cover&quot;</Label>
                <div className='radio-group'>
                  <Radio name='coveringEnabled' value='0' onChange={() => setFieldValue('coveringEnabled', true)} checked={values.coveringEnabled}>
                    Yes
                  </Radio>
                  <Radio name='coveringEnabled' value='1' onChange={() => setFieldValue('coveringEnabled', false)} checked={!values.coveringEnabled}>
                    No
                  </Radio>
                </div>

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
                      <Image path={image} refetchImages={refetchImages} alt='Meta image' />
                    </Radio>
                  ))}
                  <UploadImage refetchImages={refetchImages} />
                </div>

                <Label htmlFor='script'>Script</Label>
                <TextArea
                  className='edit-body'
                  name='script'
                  rows={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.script}
                />

                <div className='actions'>
                  <Button className='primary submit' type='submit'>
                    {post ? 'Save Changes' : 'Create Post'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }}
  </Formik>
);
