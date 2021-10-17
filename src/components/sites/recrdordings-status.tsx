import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Radio } from 'components/radio';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { recordingsViewed } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';

interface Props {
  siteId: string;
  recordingIds: string[];
  onCompleted: VoidFunction;
}

const StatusSchema = Yup.object().shape({
  status: Yup.string().oneOf(['New', 'Viewed']),
});

export const RecordingsStatus: FC<Props> = ({ recordingIds, siteId, onCompleted }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Update status</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ status: '' }}
          validationSchema={StatusSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                onCompleted();
                setSubmitting(false);
  
                await recordingsViewed({
                  siteId,
                  recordingIds,
                  viewed: values.status === 'Viewed',
                });
    
                closeModal();
          
                toasts.add({ type: 'success', body: 'Recordings updated successfully' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue updating the recordings' });
              }
            })();
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
          }) => (
            <form className='recordings-status' onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='update-recordings-title' aria-describedby='update-recordings-description'>
                <ModalHeader>
                  <p id='update-recordings-title'><b>Update Statuses</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='update-recordings-description'>Select the new status you wish to apply to the {recordingIds.length} selected recordings using the options below:</p>
                  <Radio 
                    name='status'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value='New'
                    checked={values.status === 'New'}
                  >
                    New
                  </Radio>
                  <Radio 
                    name='status'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value='Viewed'
                    checked={values.status === 'Viewed'}
                  >
                    Viewed
                  </Radio>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary' disabled={isSubmitting}>
                    Update Statuses
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalBody>
              </form>
            )}
          </Formik>
        </Modal>
    </>
  );
};
