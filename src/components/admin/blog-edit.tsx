import React from 'react';
import type { FC } from 'react';
import { last } from 'lodash';
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
import { Icon } from 'components/icon';

interface Props {
  post?: BlogPost;
  images: string[];
  onChange: (post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) => void;
  refetchImages: VoidFunction;
}

const IMAGE_PAGE_SIZE = 10;

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

export const BlogEdit: FC<Props> = ({ post, images, onChange, refetchImages }) => {
  const [imagePage, setImagePage] = React.useState<number>(1);

  const imageResults = images.slice(0, IMAGE_PAGE_SIZE * imagePage);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

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

                  <Label htmlFor='metaDescription'>Meta description</Label>
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

                  <Label htmlFor='metaImage'>Meta image URL</Label>
                  <Input 
                    type='text' 
                    name='metaImage' 
                    autoComplete='off'
                    placeholder='e.g. https://cdn.squeaky.ai/blog/site-traffic.webp'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.metaImage}
                    invalid={touched.metaImage && !!errors.metaImage}
                  />
                  <span className='validation'>{errors.metaImage}</span>
      
                  <Label htmlFor='coveringEnabled'>Show &quot;What we&apos;ll cover&quot;</Label>
                  <div className='radio-group'>
                    <Radio name='coveringEnabled' value='0' onChange={() => setFieldValue('coveringEnabled', true)} checked={values.coveringEnabled}>
                      Yes
                    </Radio>
                    <Radio name='coveringEnabled' value='1' onChange={() => setFieldValue('coveringEnabled', false)} checked={!values.coveringEnabled}>
                      No
                    </Radio>
                  </div>

                  <Label htmlFor='metaImage'>
                    Image library
                    <UploadImage refetchImages={refetchImages} />
                  </Label>
                  <div className='images'>
                    {imageResults.map(image => (
                      <div className='image-container' key={image}>
                        <Image path={image} refetchImages={refetchImages} alt='Meta image' />
                        <div className='content'>
                          <p className='detail'><b>File name:</b> {last(image.split('/'))}</p>
                          <Button className='detail copy' type='button' onClick={() => copyToClipboard(`https://cdn.squeaky.ai/${image}`)}>
                            <b>URL:</b> https://cdn.squeaky.ai/{image}
                            <Icon name='file-copy-line' className='copy-to-clipboard' />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {imageResults.length < images.length && (
                      <Button type='button' className='show-more' onClick={() => setImagePage(imagePage + 1)}>
                        Show more
                      </Button>
                    )}
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
};
