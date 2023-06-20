import React from 'react';
import type { FC } from 'react';
import { last } from 'lodash';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { UploadImage } from 'components/admin/upload-image';
import { Image } from 'components/admin/image';
import { TextArea } from 'components/textarea';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { exportChangelogPost, getInitialValues } from 'lib/admin/changelog';
import type { ChangelogPost } from 'types/graphql';
import type { ChangelogInput } from 'types/admin';

interface Props {
  post?: ChangelogPost;
  images: string[];
  onChange: (post: Omit<ChangelogPost, 'createdAt' | 'updatedAt'>) => void;
  refetchImages: VoidFunction;
}

const IMAGE_PAGE_SIZE = 10;

const ChangelogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().oneOf(['chris', 'lewis']),
  metaImage: Yup.string().required('Meta image is required'),
  metaDescription: Yup.string().required('Meta description is required'),
  body: Yup.string().required('Body is required'),
});

export const ChangelogEdit: FC<Props> = ({ post, images, onChange, refetchImages }) => {
  const [imagePage, setImagePage] = React.useState<number>(1);

  const imageResults = images.slice(0, IMAGE_PAGE_SIZE * imagePage);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <Formik<ChangelogInput>
      initialValues={getInitialValues(post)}
      validationSchema={ChangelogSchema}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          setSubmitting(false);
          const update = exportChangelogPost(values);
          onChange({ 
            ...update, 
            id: post?.id,
            metaImage: `blog/${update.metaImage}`,
          });
        })();
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        touched,
        values,
        errors,
      }) => {
        return (
          <div className='create-changelog-post'>
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
                  </div>

                  <div className='input-group'>
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
                  <div className='input-group prefix'>
                    <p>https://cdn.squeaky.ai/blog/</p>
                    <div>
                      <Input 
                        type='text' 
                        name='metaImage' 
                        autoComplete='off'
                        placeholder='e.g. site-traffic.webp'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={last(values.metaImage.split('/'))}
                        invalid={touched.metaImage && !!errors.metaImage}
                      />
                      <span className='validation'>{errors.metaImage}</span>
                    </div>
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
                          <Button className='detail copy' type='button' onClick={() => copyToClipboard(last(image.split('/')))}>
                            <b>File name:</b> {last(image.split('/'))}
                            <Icon name='file-copy-line' className='copy-to-clipboard' />
                          </Button>
                          <p className='detail'>
                            <b>URL:</b> https://cdn.squeaky.ai/{image}
                          </p>
                        </div>
                      </div>
                    ))}

                    {imageResults.length < images.length && (
                      <Button type='button' className='show-more' onClick={() => setImagePage(imagePage + 1)}>
                        Show more
                      </Button>
                    )}
                  </div>

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
