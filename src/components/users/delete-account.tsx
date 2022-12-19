import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { cache, userDelete } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';

export const DeleteAccount: FC = () => {
  const toasts = useToasts();
  const ref = React.useRef<Modal>();
  const [deleted, setDeleted] = React.useState<boolean>(false);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteAccount = async () => {
    try {
      await userDelete();
      setDeleted(true);
      closeModal();
      cache.reset();
    } catch(error) {
      toasts.add({ type: 'error', body: 'There was an issue deleting your accout, please contact us' });
    }
  };

  return (
    <>
      <Button className='tertiary delete-account' onClick={openModal}>
        Delete Account
      </Button>

      {deleted && (
        <div className='deleted-overaly'>
          <Container className='sm'>
            <Illustration illustration='illustration-14' height={256} width={256} alt='Illustraion to represent that the account has been deleted' />
            <h2>Account Deleted</h2>
            <p>We&apos;re sorry to see you go, but thanks so much for taking the time to use Squeaky. If you have any feedback please let us know:</p>
            <Link href='/contact-us' className='button primary'>
              Contact Us
            </Link>
          </Container>
        </div>
      )}

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-account-title' aria-describedby='delete-account-description'>
          <ModalHeader>
            <p id='delete-account-title'><b>Delete account</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-account-description'><b>Are you sure you wish to delete your account?</b></p>
            <p>If so, all account data and sites, will be permanently deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteAccount}>
              Yes, I&apos;m Leaving
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
