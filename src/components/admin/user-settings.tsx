import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToasts } from 'hooks/use-toasts';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import type { AdminUser } from 'types/graphql';
import { adminUserUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';

interface Props {
  user: AdminUser;
}

const UserSettingsSchema = Yup.object().shape({
  providerCommsEmail: Yup.string().email(),
});

export const UserSettings: FC<Props> = ({ user }) => {
  const toasts = useToasts();

  const omitIfEmpty = (value: string) => !!value ? value : null;

  return (
    <Card className='user-details settings'>
      <h5>
        <Icon name='settings-3-line' />
        User Settings
      </h5>

      <Formik
        initialValues={{
          providerCommsEmail: user.providerCommsEmail || '',
        }}
        validationSchema={UserSettingsSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              await adminUserUpdate({
                id: user.id,
                providerCommsEmail: omitIfEmpty(values.providerCommsEmail),
              });
              toasts.add({ type: 'success', body: 'User settings updated' });
            } catch(error) {
              console.error(error);
              toasts.add({ type: 'error', body: 'Failed to update user settings' });
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
          touched,
          values,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Label htmlFor='providerCommsEmail'>Provider comms email</Label>
            <span className='small'>Override the email we send comms to. Only available for users that have a provider.</span>
            <Container className='xxsm'>
              <Input
                type='email'
                name='providerCommsEmail'
                autoComplete='off'
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!user.provider}
                value={values.providerCommsEmail}
                invalid={touched.providerCommsEmail && !!errors.providerCommsEmail}
              />
            </Container>
            <span className='validation'>{errors.providerCommsEmail}</span>
            <div className='actions'>
              <Button type='submit' className='primary'>Save Changes</Button>
            </div>
          </form>
        )}
      </Formik>
    </Card>
  );
};
