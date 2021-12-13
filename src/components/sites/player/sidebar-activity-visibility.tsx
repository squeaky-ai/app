import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { ACTIVITIES } from 'data/recordings/constants';
import { Preference, Preferences } from 'lib/preferences';
import type { ActivityName } from 'types/event';

interface Props {
  active: ActivityName[];
  setActive: (value: ActivityName[]) => void;
}

const ActivitySchema = Yup.object().shape({
  checked: Yup.array(),
});

export const SidebarActivityVisibility: FC<Props> = ({ active, setActive }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='secondary activity-visibility' onClick={openModal}>
        <Icon name='eye-line' />
        Show
        <span>{active.length}/{ACTIVITIES.length}</span>
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='sidebar-activity-visibility-title' aria-describedby='sidebar-activity-visibility-description'>
          <Formik
            initialValues={{ checked: active }}
            validationSchema={ActivitySchema}
            onSubmit={(values, { setSubmitting }) => {
              Preferences.setArray<string>(Preference.ACTIVITY_SHOW_TYPES, values.checked);

              setSubmitting(false);
              setActive(values.checked);
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
                  <p id='sidebar-activity-visibility-title'><b>Activity Visibility</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='sidebar-activity-visibility-description'>Please select all activity types you want to see in your activity feed. Your settings are maintained across all recordings.</p>
                  <div className='checkbox-group'>
                    {ACTIVITIES.map(activity => (
                      <Checkbox 
                        key={activity.value}
                        name='checked'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={activity.value}
                        checked={values.checked.includes(activity.value)}
                      >
                        {activity.name}
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
