import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { EventCreateSelect } from 'components/sites/events/event-create-select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { EventGroupsSelector } from 'components/sites/events/event-groups-selector';
import { EventCreateCustom } from 'components/sites/events/event-create-custom';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Divider } from 'components/divider';
import { Select, Option } from 'components/select';
import { useToasts } from 'hooks/use-toasts';
import { eventsCaptureCreate } from 'lib/api/graphql';
import { EventsCaptureType } from 'types/events';
import { EventsCondition, EventsMatch } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  buttonText?: string;
  buttonClassName?: string;
}

export enum Steps {
  Select,
  Create,
}

const EventCreateSchema = Yup.object().shape({
  eventType: Yup.number().required('Event type is required'),
  matcher: Yup.string().required('Condition is required'),
  value: Yup.string().required('Condition is required'),
  name: Yup.string().required('Name is required'),
  groupIds: Yup.array(),
});

export const EventCreate: FC<Props> = ({ site, buttonText, buttonClassName }) => {
  const ref = React.useRef<Modal>();

  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className={classnames('event-create', buttonClassName)} onClick={openModal}>
        {buttonText || '+ Add New'}
      </Button>

      <Modal ref={ref} className='md event-create-modal' scrollable>
        <Formik
          initialValues={{ 
            eventType: null,
            matcher: EventsMatch.Equals,
            value: '',
            name: '',
            groupIds: [],
          }}
          validationSchema={EventCreateSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                await eventsCaptureCreate({
                  name: values.name,
                  rules: [
                    {
                      condition: EventsCondition.Or,
                      matcher: values.matcher,
                      value: values.value,
                    }
                  ],
                  siteId: site.id,
                  type: values.eventType,
                  groupIds: values.groupIds.map(n => Number(n)),
                })
                toasts.add({ type: 'success', body: 'Event create successfully' });
                closeModal();
              } catch(error) {
                console.error(error);
                toasts.add({ type: 'error', body: 'Failed to create event' });
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
              <ModalBody aria-labelledby='add-event-title'>
                <ModalHeader>
                  <p id='add-event-title'><b>Add Event</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  {values.eventType === null && (
                    <EventCreateSelect setType={(value) => setFieldValue('eventType', value)} />
                  )}

                  {values.eventType === EventsCaptureType.Custom && (
                    <EventCreateCustom />
                  )}

                  {values.eventType !== null && values.eventType !== EventsCaptureType.Custom && (
                    <>
                      <Label htmlFor='eventType'>Event type</Label>
                      <Select name='eventType' onChange={(event) => setFieldValue('eventType', Number(event.target.value))} value={values.eventType}>
                        <Option value={EventsCaptureType.PageVisit}>Page visit</Option>
                        <Option value={EventsCaptureType.TextClick}>Text click</Option>
                        <Option value={EventsCaptureType.SelectorClick}>CSS Selector click</Option>
                        <Option value={EventsCaptureType.Error}>JavaScript error</Option>
                        <Option value={EventsCaptureType.Custom}>Custom event</Option>
                      </Select>

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
                            {values.eventType === EventsCaptureType.Custom && 'TODO'}
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

                      <Label htmlFor='name'>Event name</Label>
                      <Input 
                        name='name' 
                        type='text'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        invalid={touched.name && !!errors.name}
                      />
                      <span className='validation'>{errors.name}</span>

                      <Label htmlFor='groupIds'>Group(s)</Label>
                      <p>Create a new group or choose from your existing event groups. Each event can belong to multiple groups.</p>
                      <EventGroupsSelector
                        site={site}
                        ids={values.groupIds}
                        onChange={(ids) => setFieldValue('groupIds', ids)} 
                      />
                    </>
                  )}
                </ModalContents>
                <ModalFooter>
                  {values.eventType !== EventsCaptureType.Custom && (
                    <>
                      {values.eventType !== null && (
                        <Button type='submit' className='primary'>
                          Create Event 
                        </Button>
                      )}
                      <Button type='button' className='quaternary' onClick={closeModal}>
                        Cancel
                      </Button>
                    </>
                  )}
                  {values.eventType === EventsCaptureType.Custom && (
                    <Button type='button' className='quaternary' onClick={() => setFieldValue('eventType', null)}>
                      Back
                    </Button>
                  )}
                </ModalFooter>
              </ModalBody>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  )
};
