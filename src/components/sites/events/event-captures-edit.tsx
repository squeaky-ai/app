import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Divider } from 'components/divider';
import { Select, Option } from 'components/select';
import { useToasts } from 'hooks/use-toasts';
import { EventGroupsSelector } from 'components/sites/events/event-groups-selector';
import { eventsCaptureUpdate } from 'lib/api/graphql';
import { EventsCaptureType } from 'types/events';
import { MEMBER, READ_ONLY, SUPER_USER } from 'data/teams/constants';
import { EventsCondition, EventsMatch, Team } from 'types/graphql';
import type { Site, EventsCaptureItem } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  event: EventsCaptureItem;
  onClose?: VoidFunction;
}

const EventCreateSchema = Yup.object().shape({
  eventType: Yup.number().required('Event type is required'),
  matcher: Yup.string().required('Condition is required'),
  value: Yup.string().required('Condition is required'),
  name: Yup.string().required('Name is required'),
  nameAlias: Yup.string(),
  groupIds: Yup.array(),
});

export const EventCapturesEdit: FC<Props> = ({ site, member, event, onClose }) => {
  const toasts = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const isCustomEvent = event.type === EventsCaptureType.Custom;

  return (
    <>
      <Button onClick={openModal} unauthorized={[MEMBER, READ_ONLY, SUPER_USER].includes(member?.role)}>
        <Icon name='edit-line' /> Edit
      </Button>
            
      <Modal ref={ref} onClose={onClose} className='md event-create-modal'>
        <Formik
          initialValues={{ 
            eventType: event.type,
            matcher: event.rules[0].matcher,
            value: event.rules[0].value,
            name: event.name,
            nameAlias: event.nameAlias || '',
            groupIds: event.groupIds,
          }}
          validationSchema={EventCreateSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                await eventsCaptureUpdate({
                  eventId: event.id,
                  siteId: site.id,
                  name: values.name,
                  nameAlias: values.nameAlias,
                  rules: [
                    {
                      condition: EventsCondition.Or,
                      matcher: values.matcher,
                      value: values.value,
                    }
                  ],
                  groupIds: values.groupIds.map(n => Number(n)),
                });
                toasts.add({ type: 'success', body: 'Event updated successfully' });
                closeModal();
              } catch(error) {
                console.error(error);
                toasts.add({ type: 'error', body: 'Failed to updated event' });
              } finally {
                setSubmitting(false);
              }
            })();
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            setFieldValue,
            touched,
            values,
            errors,
          }) => (                
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='edit-event-capture-title' aria-describedby='edit-event-capture-description'>
                <ModalHeader>
                  <p id='edit-event-capture-title'><b>Edit {isCustomEvent ? 'Custom Event' : 'Event'}</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  {isCustomEvent && (
                    <p>If you&apos;d like to define more user-friendly names for your events when you&apos;re viewing them within Squeaky, you can define an alias using the field below.</p>
                  )}
                  {!isCustomEvent && (
                    <>
                      <div className='input-group'>
                        <div>
                          <Label htmlFor='matcher'>Condition</Label>
                          <Select name='matcher' onChange={handleChange} value={values.matcher}>
                            <Option value={EventsMatch.Equals}>Is</Option>
                            <Option value={EventsMatch.NotEquals}>Is not</Option>
                            <Option value={EventsMatch.Contains}>Contains</Option>
                            <Option value={EventsMatch.NotContains}>Doesn&apos;t contain</Option>
                            <Option value={EventsMatch.StartsWith}>Starts with</Option>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor='value'>
                            {values.eventType === EventsCaptureType.PageVisit && 'URL'}
                            {values.eventType === EventsCaptureType.TextClick && 'Text string'}
                            {values.eventType === EventsCaptureType.SelectorClick && 'CSS selector'}
                            {values.eventType === EventsCaptureType.Error && 'Error message'}
                            {values.eventType === EventsCaptureType.Custom && 'Custom Event'}
                          </Label>
                          <Input 
                            name='value' 
                            type='text' 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.value}
                            invalid={touched.value && !!errors.value}
                            placeholder={
                              (() => {
                                if (values.eventType === EventsCaptureType.PageVisit) return 'e.g. https://example.com';
                                if (values.eventType === EventsCaptureType.SelectorClick) return 'e.g., #elementID > DIV';
                                return '';
                              })()
                            }
                          />
                          <span className='validation'>{errors.value}</span>
                        </div>
                      </div>

                      <Divider />
                    </>
                  )}

                  <Label htmlFor='name'>Event name</Label>
                  <Input 
                    name='name' 
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    disabled={isCustomEvent}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>

                  {isCustomEvent && (
                    <>
                      <Label htmlFor='name'>Alias</Label>
                      <Input 
                        name='nameAlias' 
                        type='text'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nameAlias}
                        invalid={touched.nameAlias && !!errors.nameAlias}
                      />
                      <span className='validation'>{errors.nameAlias}</span>
                    </>
                  )}

                  <Label htmlFor='groupIds'>Group(s)</Label>
                  <p>Create a new group or choose from your existing event groups. Each event can belong to multiple groups.</p>
                  <EventGroupsSelector
                    site={site}
                    ids={values.groupIds}
                    onChange={(ids) => setFieldValue('groupIds', ids)} 
                  />
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Update
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
