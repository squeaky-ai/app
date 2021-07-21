import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Note } from 'components/sites/note';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { TIMESTAMP_REGEX } from 'data/sites/constants';
import { usePlayerState } from 'hooks/player-state';
import { noteDelete, noteCreate, noteUpdate } from 'lib/api/graphql';
import type { Recording, Note as INote } from 'types/recording';

interface Props {
  recording: Recording;
}

const NoteSchema = Yup.object().shape({
  timestamp: Yup.string().matches(TIMESTAMP_REGEX, 'Timestamp must be formatted as 00:00'),
  body: Yup.string().required('Note is required')
});

export const SidebarNotes: FC<Props> = ({ recording }) => {
  const router = useRouter();
  const ref = React.useRef<Modal>();
  const [state] = usePlayerState();

  const siteId = router.query.site_id + '';

  const notes = recording.notes || [];

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const timeString = (seconds: number) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };

  const handleDelete = async (id: string) => {
    await noteDelete({ 
      site_id: siteId, 
      session_id: recording.sessionId, 
      note_id: id
    });
  };

  const handleUpdate = async (note: INote) => {
    await noteUpdate({
      site_id: siteId, 
      session_id: recording.sessionId, 
      note_id: note.id,
      body: note.body,
      timestamp: note.timestamp
    })
  };

  return (
    <>
      <div className={classnames('notes', { empty: notes.length === 0 })}>
        <div className='empty-state'>
          <p>There are no notes for this recording</p>
          <Button className='secondary' onClick={openModal}>+ Add Note</Button>
        </div>
        <div className='note-state'>
          <Button className='secondary create-note' onClick={openModal}>+ Add Note</Button>

          {notes.map(note => (
            <Note 
              key={note.id} 
              note={note}
              handleDelete={handleDelete} 
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='add-note-title'>
          <Formik
            initialValues={{ timestamp: timeString(state.progress), body: '' }}
            validationSchema={NoteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                setSubmitting(false);

                const timestamp = values.timestamp
                  ? Number(values.timestamp.replace(':', '')) * 1000
                  : null;

                await noteCreate({ 
                  site_id: siteId, 
                  session_id: recording.sessionId, 
                  body: values.body,
                  timestamp
                });

                closeModal();
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
                <p id='add-note-title'><b>Add Note</b></p>
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
              <ModalFooter>
                <Button disabled={isSubmitting || !(dirty && isValid)} type='submit' className='primary'>
                  Save
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
    </>
  );
};
