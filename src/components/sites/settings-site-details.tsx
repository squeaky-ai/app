import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Label } from 'components/label';
import { Drawer } from 'components/drawer';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { updateSite } from 'lib/api/graphql';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

export const SettingsSiteDetails: FC<Props> = ({ site }) => {
  const toast = useToasts();

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Drawer title='Site details' name='details'>
      <Formik
        initialValues={{ name: site.name, protocol: `${site.url.split('://')[0]}://`, hostname: site.url.split('://')[1] }}
        validationSchema={DetailsSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          (async () => {
            const { name, protocol, hostname } = values;
            const url = `${protocol}${hostname}`;

            if (!validateUrl(url)) {
              return setErrors({ 'hostname': 'URL must be a valid hostname' });
            }

            if (url !== site.url) {
              toast.add({ type: 'error', body: 'Please note, your tracking code will need to be updated as you’ve changed your URL.' });
            }

            const { error } = await updateSite({ siteId: site.id, name, url });
            setSubmitting(false);

            if (error) {
              const [key, value] = Object.entries(error)[0];
              setErrors({ [key]: value });
            } else {
              toast.add({ type: 'success', body: 'Your site changes have been successfully saved.' });
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
            <Container className='xsm'>
              <Label htmlFor='name'>Site Name</Label>
              <Input
                name='name' 
                type='text' 
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='e.g. My Webite'
                value={values.name}
                invalid={touched.name && !!errors.name}
              />
              <span className='validation'>{errors.name}</span>

              <Label htmlFor='hostname'>Site URL</Label>
              <div className='select-input-group'>
                <Select name='protocol' onChange={handleChange} value={values.protocol} invalid={touched.protocol && !!errors.protocol}>
                  <Option value='https://'>https://</Option>
                  <Option value='http://'>http://</Option>
                </Select>
                <Input
                  name='hostname' 
                  type='text' 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='e.g. www.mywebsite.com'
                  value={values.hostname}
                  invalid={touched.hostname && !!errors.hostname}
                />
                <span className='validation'>{errors.hostname}</span>
              </div>

              <Button type='submit' disabled={isSubmitting} className='primary'>
                Save Changes
              </Button>
            </Container>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};
