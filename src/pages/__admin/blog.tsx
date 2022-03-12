import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { Label } from 'components/label';
import { Card } from 'components/card';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { Toggle } from 'components/toggle';
import { useAdmin } from 'hooks/use-admin';
import { exportBlogMeta } from 'lib/admin/blog';
import { YYYY_MM_DD_REGEX, HH_MM_REGEX } from 'data/common/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { BlogInput } from 'types/admin';

const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is requied'),
  tags: Yup.string().required('Tags are requied'),
  author: Yup.string().oneOf(['chris', 'lewis']),
  category: Yup.string().required('Category is requied'),
  date: Yup.string().matches(YYYY_MM_DD_REGEX, 'Date must be YYYY-MM-DD'),
  draft: Yup.boolean(),
  time: Yup.string().matches(HH_MM_REGEX, 'Time must be HH:MM'),
  metaImage: Yup.string().required('Meta image is required'),
  metaDescription: Yup.string().required('Meta description is required'),
  body: Yup.string().required('Body is required'),
});

const AdminBlog: NextPage<ServerSideProps> = () => {
  const { admin, loading, error } = useAdmin();

  if (error) {
    return <Error />;
  }

  const [dateString, timeString] = (() => {
    const date = new Date();
    const parts = date.toLocaleString().split(', ');

    return [
      parts[0].split('/').reverse().join('-'),
      parts[1].slice(0, 5),
    ];
  })();

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Blog</title>
      </Head>

      <Page tab='blog' activeVisitors={admin.activeVisitorsAdmin}>
        {loading && (
          <Spinner />
        )}

        <Formik<BlogInput>
          initialValues={{ 
            title: '',
            tags: '',
            author: 'chris',
            category: '',
            date: dateString,
            time: timeString,
            draft: true,
            metaImage: '',
            metaDescription: '',
            body: '',
          }}
          validationSchema={BlogSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(values);
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
            const output = exportBlogMeta(values);

            return (
              <Card className='create-blog-post'>
                <h5>Create Blog Post</h5>

                <div className='grid'>
                  <form onSubmit={handleSubmit}>
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

                    <Label htmlFor='author'>Author</Label>
                    <Select name='author' onChange={handleChange} value={values.author}>
                      <Option value='chris'>Chris Pattison</Option>
                      <Option value='lewis'>Lewis Monteith</Option>
                    </Select>

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

                    <div className='input-group'>
                      <div>
                        <Label htmlFor='date'>Date</Label>
                        <Input 
                          type='text' 
                          name='date' 
                          placeholder='e.g. 2022-03-22'  
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.date}
                          invalid={touched.date && !!errors.date}
                        />
                        <span className='validation'>{errors.date}</span>
                      </div>
                      <div>
                        <Label htmlFor='time'>Time</Label>
                        <Input 
                          type='text'
                          name='time'
                          placeholder='e.g. 16:30'  
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.time}
                          invalid={touched.time && !!errors.time}
                        />
                        <span className='validation'>{errors.time}</span>
                      </div>
                    </div>

                    <Toggle checked={values.draft} name='draft' onChange={(event) => setFieldValue('draft', event.target.checked)}>
                      Draft
                    </Toggle>

                    <Label htmlFor='metaImage'>Meta Image</Label>
                    <Input 
                      type='text'
                      name='metaImage'
                      placeholder='e.g. https://squeaky.ai/blog/path-to-image.jpg'  
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.metaImage}
                      invalid={touched.metaImage && !!errors.metaImage}
                    />
                    <span className='validation'>{errors.metaImage}</span>

                    <Label htmlFor='metaDescription'>Meta Description</Label>
                    <TextArea 
                      name='metaDescription' 
                      rows={5}   
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.metaDescription}
                      invalid={touched.metaDescription && !!errors.metaDescription}
                    />
                    <span className='validation'>{errors.metaDescription}</span>

                    <Label htmlFor='body'>Body</Label>
                    <TextArea 
                      name='body' 
                      rows={20} 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.body}
                      invalid={touched.body && !!errors.body}
                    />
                    <span className='validation'>{errors.body}</span>

                    <Button type='submit' className='primary'>Download</Button>
                  </form>
                </div>
              </Card>
            );
          }}
        </Formik>
      </Page>
    </>
  );
};

export default AdminBlog;
export { getServerSideProps };
