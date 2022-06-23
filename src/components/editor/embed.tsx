import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { ToolbarButton } from 'components/editor/toolbar-button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { TextArea } from 'components/textarea';
import type { CreateInput } from 'components/editor/blots/embed';
import type { Quill } from 'quill';

interface Props {
  editor: Quill;
}

const EmbedSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
});

export const Embed: FC<Props> = ({ editor }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <ToolbarButton description='Embed' onClick={openModal}>
        <Icon name='slideshow-line' />
      </ToolbarButton>

      <Modal ref={ref} className='sm'>
        <Formik
          initialValues={{ code: '' }}
          validationSchema={EmbedSchema}
          onSubmit={(values, { setSubmitting }) => {
            const range = editor.getSelection(true);
            const input: CreateInput = { html: values.code };

            editor.insertEmbed(range.index, 'embed', input, 'user');

            setSubmitting(false);
            closeModal();
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
            values,
            errors,
            isSubmitting,
          }) => (                
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='insert-title'>
                <ModalHeader>
                  <p id='insert-title'><b>Embed</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <TextArea
                    name='code'
                    rows={6}
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    invalid={touched.code && !!errors.code}
                  />
                  <span className='validation'>{errors.code}</span>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' disabled={isSubmitting || !values.code} className='primary'>
                    Insert 
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
  )
};
