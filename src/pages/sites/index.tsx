import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Container } from '../../components/container';
import { Header } from '../../components/sites/header';
import { Label } from '../../components/label';
import { Main } from '../../components/main';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../components/modal';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';
import { createSite } from '../../lib/api/graphql';
import { useSites } from '../../hooks/sites';

const CreateSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  url: Yup.string().required('Site URL is required')
});

const Sites: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const ref = React.createRef<Modal>();
  const [loading, sites] = useSites();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <div className='page sites'>
      <Head>
        <title>Squeaky / Sites</title>
      </Head>

      <Header />

      <Main>
        {!loading && sites.length === 0 && (
          <div className='empty-state'>
            <div className='contents'>
              <Image src='/empty-state-1.svg' height={260} width={500} />
              <h2>Welcome to Squeaky</h2>
              <p>It’s time to discover what your users are really getting up to! Add your first site by clicking the button below.</p>
              <Button className='button primary icon' onClick={openModal}>
                Add Site
                <i className='ri-arrow-right-line' />
              </Button>
            </div>
        </div>
        )}

        {!loading && sites.length > 0 && (
          <>
            <h4 className='title'>
              Sites
              <Button className='new-site' onClick={openModal}>+ Add New</Button>
            </h4>

            <ul className='sites-list'>
              {sites.map(site => (
                <li key={site.id}>
                  <Link href={`/sites/${site.id}/recordings`}>
                    <a>
                      <span className='avatar'></span>
                      <p className='name'><b>{site.name}</b></p>
                      <p className='url'>{site.url}</p>
                      <p className='owner'>Owner: {site.ownerName}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Main>

      <Modal ref={ref}>
        <ModalBody>
          <Formik
            initialValues={{ name: '', url: '' }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              (async () => {
                const { site, error } = await createSite(values.name, values.url);

                setSubmitting(false);

                if (error) {
                  const [key, value] = Object.entries(error)[0];
                  setErrors({ [key]: value });
                } else {
                  closeModal();
                  await router.push(`/sites/${site.id}/recordings`);
                }            
              })();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <p><b>Add Site</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p>Please enter your site details below.</p>

                  <Label htmlFor='name'>Site Name</Label>
                  <Input
                    name='name' 
                    type='text' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. My Webite'
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>

                  <Label htmlFor='url'>Site URL</Label>
                  <Input
                    name='url' 
                    type='url' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. www.mywebsite.com'
                    value={values.url}
                    invalid={touched.url && !!errors.url}
                  />
                  <span className='validation'>{errors.url}</span>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Continue
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sites;
export { getServerSideProps };
