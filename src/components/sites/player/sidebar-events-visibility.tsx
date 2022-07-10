import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { EVENTS } from 'data/recordings/constants';
import { Preference, Preferences } from 'lib/preferences';
import type { PlayerState, Action } from 'types/player';

interface Props {
  state: PlayerState;
  dispatch: React.Dispatch<Action>;
}

const EventsSchema = Yup.object().shape({
  checked: Yup.array(),
});

export const SidebarEventsVisibility: FC<Props> = ({ state, dispatch }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='secondary events-visibility' onClick={openModal}>
        <Icon name='eye-line' />
        Show
        <span>{state.eventVisibility.length}/{EVENTS.length}</span>
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='sidebar-events-visibility-title' aria-describedby='sidebar-events-visibility-description'>
          <Formik
            initialValues={{ checked: state.eventVisibility }}
            validationSchema={EventsSchema}
            onSubmit={(values, { setSubmitting }) => {
              Preferences.setArray<string>(Preference.EVENTS_SHOW_TYPES, values.checked);

              setSubmitting(false);
              dispatch({ type: 'eventVisibility', value: values.checked });
              closeModal();
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <p id='sidebar-events-visibility-title'><b>Events Visibility</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='sidebar-events-visibility-description'>Please select all events types you want to see in your events feed. Your settings are maintained across all recordings.</p>
                  <div className='checkbox-group'>
                    {EVENTS.map(event => (
                      <Checkbox 
                        key={event.value}
                        name='checked'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={event.value}
                        checked={values.checked.includes(event.value)}
                      >
                        {event.name}
                      </Checkbox>
                    ))}
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Save Changes
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
