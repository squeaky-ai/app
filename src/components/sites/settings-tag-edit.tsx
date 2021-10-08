import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import type { Tag as ITag } from 'types/recording';

interface Props {
  tag: ITag;
}

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export const SettingsTagEdit: FC<Props> = ({ tag }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='link' onClick={openModal}>Edit</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ name: tag.name }}
          validationSchema={FeedbackSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              setSubmitting(false);
              closeModal();
              console.log(values);
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
              <ModalBody aria-labelledby='delete-tag-title' aria-describedby='delete-tag-description'>
                <ModalHeader>
                  <p id='delete-tag-title'><b>Edit Tag</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='name'>Tag Name</Label>
                  <Input
                    name='name' 
                    type='name' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary' disabled={isSubmitting}>
                    Save Changes
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
