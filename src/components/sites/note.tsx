import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import { TIMESTAMP_REGEX } from 'data/sites/constants';
import { Note as INote } from 'types/recording';

interface Props {
  note: INote;
  setProgress: (value: number) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (note: INote) => void;
}

const NoteSchema = Yup.object().shape({
  timestamp: Yup.string().matches(TIMESTAMP_REGEX, 'Timestamp must be formatted as 00:00'),
  body: Yup.string().required('Note is required')
});

export const Note: FC<Props> = ({ note, setProgress, handleDelete, handleUpdate }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const timeString = (ms?: number) => {
    if (!ms) return '';

    const date = new Date(0);
    date.setSeconds(ms / 1000);
    return date.toISOString().substr(14, 5);
  };

  const onDelete = () => {
    closeModal();
    handleDelete(note.id);
  };

  const onUpdate = (update: Partial<INote>) => {
    closeModal();
    handleUpdate({ ...note, ...update });
  };

  return (
    <>
      <div className='note'>
        <div className='title'>
          {note.timestamp
            ? <ActivityTimestamp timestamp={note.timestamp} offset={0} setProgress={setProgress} />
            : <i className='no-timestamp'>No timestamp</i>
          }
          <Dropdown button={<i className='ri-more-2-fill' />} buttonClassName='kebab'>
            <Button onClick={openModal}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </Dropdown>
        </div>
        <p className='body'>
          {note.body}
        </p>
        <p className='user'>
          <i className='ri-account-circle-line' />
          <span>{note.user.fullName}</span>
        </p>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='add-note-title'>
          <Formik
            initialValues={{ timestamp: timeString(note.timestamp), body: note.body }}
            validationSchema={NoteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                setSubmitting(false);

                const timestamp = values.timestamp
                  ? Number(values.timestamp.replace(':', '')) * 1000
                  : null;

                onUpdate({ body: values.body, timestamp });
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
              isValid,
              dirty,
            }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>
                <p id='add-note-title'><b>Edit Note</b></p>
                <Button type='button' onClick={closeModal}>
                  <i className='ri-close-line' />
                </Button>
              </ModalHeader>
              <ModalContents>
                <Label htmlFor='timestamp'>Timestamp</Label>
                <Input 
                  type='text' 
                  name='timestamp' 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='00:00'
                  value={values.timestamp}
                  invalid={touched.timestamp && !!errors.timestamp}
                />
                <span className='validation'>{errors.timestamp}</span>

                <Label htmlFor='note'>Note</Label>
                <TextArea
                  name='body' 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Add note...'
                  rows={4}
                  value={values.body}
                  invalid={touched.body && !!errors.body}
                />
                <span className='validation'>{errors.body}</span>
              </ModalContents>
              <ModalFooter className='split'>
                <div className='group'>
                  <Button disabled={isSubmitting || !(dirty && isValid)} type='submit' className='primary'>
                    Save
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
                <Button type='button' className='tertiary' onClick={onDelete}>
                  Delete
                </Button>
              </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};
