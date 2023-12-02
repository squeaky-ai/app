import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import * as Yup from 'yup';
import { sortBy } from 'lodash';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Note } from 'components/sites/player/note';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { TIMESTAMP_REGEX } from 'data/sites/constants';
import { toTimeString, fromTimeString } from 'lib/dates';
import { READ_ONLY, SUPER_USER } from 'data/teams/constants';
import { noteDelete, noteCreate, noteUpdate } from 'lib/api/graphql';
import type { Recording, Note as INote, Team } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  member?: Team;
  replayer: Replayer;
  recording: Recording;
}

const NoteSchema = Yup.object().shape({
  timestamp: Yup.string().matches(TIMESTAMP_REGEX, 'Timestamp must be formatted as 00:00'),
  body: Yup.string().required('Note is required')
});

export const SidebarNotes: FC<Props> = ({ member, recording, replayer }) => {
  const ref = React.useRef<Modal>();
  const [siteId] = useSiteId();

  const notes = sortBy(recording.notes || [], note => note.timestamp); 

  const openModal = () => {
    if (ref.current) {
      ref.current.show();
      replayer.pause();
    }
  };

  const closeModal = () => {
    if (ref.current) {
      ref.current.hide();
      replayer.play(replayer.getCurrentTime());
    }
  };

  const handleDelete = async (id: string) => {
    await noteDelete({ 
      siteId, 
      recordingId: recording.id, 
      noteId: id
    });
  };

  const handleUpdate = async (note: INote) => {
    await noteUpdate({
      siteId: siteId, 
      recordingId: recording.id, 
      noteId: note.id,
      body: note.body,
      timestamp: note.timestamp
    })
  };

  return (
    <>
      <h5>
        Notes
        {notes.length > 0 && (
          <Button className='secondary create-note' onClick={openModal} unauthorized={[READ_ONLY, SUPER_USER].includes(member?.role)}>
            + Add Note
          </Button>
        )}
      </h5>
      <div className={classnames('notes', { empty: notes.length === 0 })}>
        <div className='create-state'>
          <p>There are no notes for this recording</p>
          <Button className='secondary' onClick={openModal} unauthorized={[READ_ONLY, SUPER_USER].includes(member?.role)}>
            + Add Note
          </Button>
        </div>
        <div className='note-state'>
          {notes.map(note => (
            <Note 
              key={note.id} 
              note={note}
              handleDelete={handleDelete} 
              handleUpdate={handleUpdate}
              replayer={replayer}
            />
          ))}
        </div>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='add-note-title'>
          <Formik
            initialValues={{ timestamp: toTimeString(replayer?.getCurrentTime()), body: '' }}
            validationSchema={NoteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                setSubmitting(false);

                await noteCreate({
                  siteId, 
                  recordingId: recording.id, 
                  body: values.body,
                  timestamp: fromTimeString(values.timestamp) || null,
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
                  <Icon name='close-line' />
                </Button>
              </ModalHeader>
              <ModalContents>
                <Label htmlFor='timestamp'>Timestamp</Label>
                <Input 
                  type='text' 
                  name='timestamp' 
                  autoComplete='off'
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
