import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Note } from 'components/sites/note';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { TIMESTAMP_REGEX } from 'data/sites/constants';
import { usePlayerState } from 'hooks/player-state';
import { noteDelete } from 'lib/api/graphql';
import type { Recording } from 'types/recording';

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
  const [_state, dispatch] = usePlayerState();

  const siteId = router.query.site_id + '';

  const notes = recording.notes || [];

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const setProgress = (ms: number) => {
    dispatch({ type: 'progress', value: ms / 1000 });
  };

  const handleDelete = async (id: string) => {
    await noteDelete({ 
      site_id: siteId, 
      session_id: recording.id, 
      note_id: id
    });
  };

  return (
    <>
      <div className={classnames('notes', { empty: notes.length === 0 })}>
        <div className='empty-state'>
          <p>There are no notes for this recording</p>
          <Button className='secondary' onClick={openModal}>+ Add Note</Button>
        </div>
        <div className='note-state'>
          {notes.map(note => (
            <Note 
              key={note.id} 
              note={note} 
              setProgress={setProgress} 
              handleDelete={handleDelete} 
            />
          ))}
        </div>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='add-note-title'>
          <Formik
            initialValues={{ timestamp: '', body: '' }}
            validationSchema={NoteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                console.log(values);  
                setSubmitting(false);
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
                <Button type='button' onClick={openModal}>
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
