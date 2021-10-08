import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Label } from 'components/label';
import { tagsMerge } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Tag as ITag } from 'types/recording';
import { Input } from 'components/input';

interface Props {
  tags: ITag[];
  siteId: string;
  onCompleted: VoidFunction;
}

const TagSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
});

export const SettingsTagsMerge: FC<Props> = ({ tags, siteId, onCompleted }) => {
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
      <Button onClick={openModal}>Merge</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={TagSchema}
          onSubmit={(values) => {
            (async () => {
              try {
                onCompleted();

                await tagsMerge({ 
                  siteId,
                  tagIds: tags.map(t => t.id),
                  name: values.name,
                });
          
                toasts.add({ type: 'success', body: 'Tags merged successfully' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue merging the tags' });
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
              <ModalBody aria-labelledby='merge-tags-title' aria-describedby='merge-tags-description'>
                <ModalHeader>
                  <p id='merge-tags-title'><b>Merge Tags</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='merge-tags-description'>You have selected the following tags to merge:</p>
                  <ul>
                    {tags.map(tag => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>

                  <Label htmlFor='name'>Merged Tag Name</Label>
                  <Input
                    name='name' 
                    type='name' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='tertiary' disabled={isSubmitting}>
                    Merge Tags
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
