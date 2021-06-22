import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { userDelete } from 'lib/api/graphql';
import { useToasts } from 'hooks/toasts';

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
    const success = await userDelete();

    if (success) {
      setDeleted(true);
    } else {
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
            <Image src='/account-deleted.svg' height={256} width={256} />
            <h2>Account Deleted</h2>
            <p>We’re sorry to see you go, but thanks so much for taking the time to use Squeaky. If you have any feedback please let us know:</p>
            <a href='/contact' className='button primary'>
              Contact Us
            </a>
          </Container>
        </div>
      )}

      <Modal ref={ref}>
        <ModalBody>
          <ModalHeader>
            <p><b>Delete account</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p><b>Are you sure? If so, all account data and sites, will be permanently deleted.</b></p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteAccount}>
              Yes, I'm Leaving
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
