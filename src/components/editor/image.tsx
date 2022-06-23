import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { ToolbarButton } from 'components/editor/toolbar-button';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { UploadImage } from 'components/admin/upload-image';
import type { CreateInput } from 'components/editor/blots/figure';
import type { Quill } from 'quill';

interface Props {
  editor: Quill;
  images: string[];
  refetchImages: VoidFunction;
}

const ImageSchema = Yup.object().shape({
  alt: Yup.string().required('Alt is required'),
  src: Yup.string().required('Src is required'),
  caption: Yup.string().required('Caption is required'),
});

export const Image: FC<Props> = ({ editor, images, refetchImages }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <ToolbarButton description='Upload image' onClick={openModal}>
        <Icon name='image-line' />
      </ToolbarButton>

      <Modal ref={ref} className='md image-insert-modal'>
        <Formik
          initialValues={{ src: '', alt: '', caption: '' }}
          validationSchema={ImageSchema}
          onSubmit={(values, { setSubmitting }) => {
            const range = editor.getSelection(true);
            const input: CreateInput = {
              src: `https://cdn.squeaky.ai/${values.src}`,
              alt: values.alt,
              caption: values.caption,
            };

            editor.insertEmbed(range.index, 'figure', input, 'user');

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
            setFieldValue,
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
                  {values.src && (
                    <div className='selected-image'>
                      <Label htmlFor='alt'>Alt text</Label>
                      <Input
                        name='alt'
                        value={values.alt}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        invalid={touched.alt && !!errors.alt}
                      />
                      <span className='validation'>{errors.alt}</span>
                      <Label htmlFor='caption'>Caption</Label>
                      <Input
                        name='caption'
                        value={values.caption}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        invalid={touched.caption && !!errors.caption}
                      />
                      <span className='validation'>{errors.caption}</span>
                    </div>
                  )}

                  {!values.src && (
                    <div className='images'>
                      {images.map(image => (
                        <Button key={image} onClick={() => setFieldValue('src', image)}>
                          <img src={`https://cdn.squeaky.ai/${image}`} />
                        </Button>
                      ))}
                      <UploadImage 
                        refetchImages={refetchImages}
                        onImageUpload={image => setFieldValue('src', image)}
                      />
                    </div>
                  )}
                </ModalContents>
                <ModalFooter>
                  {values.src && (
                    <Button type='submit' className='primary' disabled={isSubmitting}>
                      Insert 
                    </Button>
                  )}
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
