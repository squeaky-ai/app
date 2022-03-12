import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { sum } from 'lodash';
import { Formik } from 'formik';
import { Error } from 'components/error';
import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { Label } from 'components/label';
import { Card } from 'components/card';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { Radio } from 'components/radio';
import { UploadImage } from 'components/admin/upload-image';
import { Select, Option } from 'components/select';
import { Icon } from 'components/icon';
import { Toggle } from 'components/toggle';
import { Image } from 'components/admin/image';
import { useAdminBlog } from 'hooks/use-admin-blog';
import { YYYY_MM_DD_REGEX, HH_MM_REGEX } from 'data/common/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { exportBlogMeta, uploadFile, objectToYaml } from 'lib/admin/blog';
import type { BlogInput } from 'types/admin';
import type { AdminBlogSignImage } from 'types/graphql';

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

const MUTATION = gql`
  mutation AdminBlogSignImage($input: AdminBlogSignImageInput!) {
    adminBlogSignImage(input: $input) {
      url
      fields
    }
  }
`;

const AdminBlog: NextPage<ServerSideProps> = () => {
  const editor = React.useRef<HTMLPreElement>(null);

  const { admin, loading, error, refetch } = useAdminBlog();
  
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [createSignedLink] = useMutation<{ adminBlogSignImage: AdminBlogSignImage }>(MUTATION);

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

  const handleDrop = async (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);

    // Insert it at the end if there's no focus
    const position = document.getSelection().anchorOffset || editor.current.innerText.trim().length;

    const file = event.dataTransfer.items[0].getAsFile();

    if (!file) return;

    const text = editor.current.innerText;
    const lines = text.split('\n');
    const lineLengths = lines.map(t => t.length);

    const line = lineLengths.reduce((acc, line) => {
      return position <= sum(lineLengths.slice(0, line))
        ? acc
        : acc + 1;
    }, 0) || 2;

    const update = [
      ...lines.slice(0, line),
      `\n![Alt text](https://cdn.squeaky.ai/blog/${file.name})\n*Add image caption here*\n`,
      ...lines.slice(line),
    ].join('\n');

    editor.current.innerText = update;

    await uploadFile(file, createSignedLink);
    refetch();
  };

  const handleDragOver = (event: React.DragEvent<HTMLPreElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);
  };

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
            body: '# Hello World!',
          }}
          validationSchema={BlogSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              setSubmitting(false);
              const meta = exportBlogMeta(values);
              await navigator.clipboard.writeText(objectToYaml(meta));
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
                    <div className='images'>
                      {admin.blogImagesAdmin.map(image => (
                        <Radio 
                          key={image}
                          name='metaImage'
                          value={image} 
                          onChange={handleChange}
                          className={classnames('image-container', { selected: values.metaImage === image })}
                        >
                          <Image path={image} refetchImages={refetch} />
                        </Radio>
                      ))}
                      <UploadImage refetchImages={refetch} createSignedLink={createSignedLink} />
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
                    <pre className='code block' onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}>
                      <code 
                        id='body'
                        ref={editor}
                        contentEditable 
                        suppressContentEditableWarning 
                        onBlur={(event: React.FocusEvent<HTMLElement>) => {
                          const element = event.target as HTMLElement;

                          handleBlur(event);
                          setFieldValue('body', element.innerText);
                        }}
                      >
                        {values.body}
                      </code>
                      
                      {dragging && (
                        <div className='dragging'>
                          <Icon name='upload-cloud-2-line' />
                          <p>Drop file here</p>
                          <Button className='link' onClick={() => setDragging(false)}>Cancel</Button>
                        </div>
                      )}
                    </pre>

                    <Button type='submit' className='primary'>Copy to clipboard</Button>
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
