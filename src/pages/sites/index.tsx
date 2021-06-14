import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../components/container';
import { Header } from '../../components/sites/header';
import { Spinner } from '../../components/spinner';
import { Button } from '../../components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../components/modal';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';
import { useSites } from '../../hooks/sites';

const Sites: NextPage<ServerSideProps> = () => {
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

      <Container className='lg centered'>
        {loading && (
          <Spinner />
        )}

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
              Site
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
      </Container>

      <Modal ref={ref}>
        <ModalBody>
          <ModalHeader>
            <p><b>Add Site</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Hello</p>
          </ModalContents>
          <ModalFooter>
            <Button type='submit' className='primary'>
              Continue
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sites;
export { getServerSideProps };
