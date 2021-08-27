import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { TextArea } from 'components/textarea';
import { Select, Option } from 'components/select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { feedbackCreate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { BASE_PATH } from 'data/common/constants';

const FeedbackSchema = Yup.object().shape({
  type: Yup.string().oneOf(['general', 'feature', 'bug', 'complaint'], 'Please select a feedback type'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is requied')
});

export const SidebarFeedback: FC = () => {
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
      <div className='link feedback' data-label='Feedback'>
        <Button onClick={openModal}>
          <div className='icon'>
            <Image src={`${BASE_PATH}/lightbulb.svg`} height={24} width={24} />
          </div>
          <span>Feedback</span>
        </Button>
      </div>

      <Modal ref={ref} className='md'>
        <ModalBody aria-labelledby='feedback-title' aria-describedby='feedback-description'>
          <Formik
            initialValues={{ type: '', subject: '', message: '' }}
            validationSchema={FeedbackSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                try {
                  await feedbackCreate(values);

                  setSubmitting(false);
                  closeModal();

                  toasts.add({ type: 'success', body: 'Feedback sent successfully' });
                } catch {
                  setSubmitting(false);

                  toasts.add({ type: 'error', body: 'There was an issue sending your feedback' });
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
                <ModalHeader>
                  <p id='feedback-title'><b>Feedback</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='feedback-description'>We’re working hard to continuously improve Squeaky and we want to hear any and all feedback. Please use the form below to get in touch and we’ll get back to you as soon as possible.</p>

                  <Label htmlFor='type'>Feedback type</Label>
                  <Select name='type' onChange={handleChange} value={values.type} invalid={touched.type && !!errors.type}>
                    <Option value=''>Please select ...</Option>
                    <Option value='general'>General Enquiry</Option>
                    <Option value='feature'>Feature Request</Option>
                    <Option value='bug'>Bug</Option>
                    <Option value='complaint'>Complaint</Option>
                  </Select>
                  <span className='validation'>{errors.type}</span>

                  <Label htmlFor='subject'>Subject</Label>
                  <Input
                    name='subject' 
                    type='subject' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. I’ve found a bug'
                    value={values.subject}
                    invalid={touched.subject && !!errors.subject}
                  />
                  <span className='validation'>{errors.subject}</span>

                  <Label htmlFor='message'>Message</Label>
                  <TextArea
                    name='message' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Enter your message ...'
                    rows={4}
                    value={values.message}
                    invalid={touched.message && !!errors.message}
                  />
                  <span className='validation'>{errors.message}</span>

                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Submit Feedback
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
