import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Checkbox } from 'components/checkbox';
import { Select, Option } from 'components/select';
import { Radio } from 'components/radio';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { useToasts } from 'hooks/use-toasts';
import { adminSitePlanUpdate } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

const PlanSchema = Yup.object().shape({
  maxMonthlyRecordings: Yup.number().required('Maximum visits per month is required'),
  responseTimeHours: Yup.number().required('SLA response time is required'),
  dataStorageMonths: Yup.number().required('Data retention is required'),
  support: Yup.array(),
  ssoEnabled: Yup.boolean(),
  auditTrailEnabled: Yup.boolean(),
  privateInstanceEnabled: Yup.boolean(),
  notes: Yup.string(),
});

export const SiteEnterpriseSettings: FC<Props> = ({ site }) => {
  const toasts = useToasts();

  return (
    <div className='enterprise-settings'>
      <Formik
        initialValues={{
          maxMonthlyRecordings: site.plan.maxMonthlyRecordings,
          support: site.plan.support,
          responseTimeHours: site.plan.responseTimeHours,
          dataStorageMonths: site.plan.dataStorageMonths,
          ssoEnabled: site.plan.ssoEnabled,
          auditTrailEnabled: site.plan.auditTrailEnabled,
          privateInstanceEnabled: site.plan.privateInstanceEnabled,
          notes: site.plan.notes || '',
        }}
        validationSchema={PlanSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              await adminSitePlanUpdate({ 
                siteId: site.id,
                maxMonthlyRecordings: Number(values.maxMonthlyRecordings),
                responseTimeHours: Number(values.responseTimeHours),
                dataStorageMonths: Number(values.dataStorageMonths),
                support: values.support,
                ssoEnabled: values.ssoEnabled,
                auditTrailEnabled: values.auditTrailEnabled,
                privateInstanceEnabled: values.privateInstanceEnabled,
                notes: values.notes,
              });
              toasts.add({ type: 'success', body: 'Enterprise settings updated' });
            } catch(error) {
              console.error(error);
              toasts.add({ type: 'error', body: 'Failed to update enterprise settings' });
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
        }) => {
          const setBooleanRadio = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(name, event.target.value === '1');
          };

          return (
            <form onSubmit={handleSubmit}>
              <Label htmlFor='maxMonthlyRecordings'>Maximum visits per month</Label>
              <Input 
                type='text'
                name='maxMonthlyRecordings'
                autoComplete='off'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxMonthlyRecordings}
                invalid={touched.maxMonthlyRecordings && !!errors.maxMonthlyRecordings}
              />
              <span className='validation'>{errors.maxMonthlyRecordings}</span>

              <Label>Support type</Label>
              <div className='checkbox-group'>
                <Checkbox name='support' value='Email' onChange={handleChange} checked={values.support.includes('Email')}>
                  Email
                </Checkbox>
                <Checkbox name='support' value='Chat' onChange={handleChange} checked={values.support.includes('Chat')}>
                  Chat
                </Checkbox>
                <Checkbox name='support' value='Phone' onChange={handleChange} checked={values.support.includes('Phone')}>
                  Phone
                </Checkbox>
              </div>

              <Label className='sublabel' htmlFor='responseTimeHours'>SLA response time <i>(business hours)</i></Label>
              <Select name='responseTimeHours' value={values.responseTimeHours} onChange={handleChange} invalid={touched.responseTimeHours && !!errors.responseTimeHours}>
                <Option value='0'>Same day</Option>
                <Option value='24'>24 hours</Option>
                <Option value='168'>7 days</Option>
              </Select>

              <Label htmlFor='dataStorageMonths'>Data retention</Label>
              <Select name='dataStorageMonths' value={values.dataStorageMonths} onChange={handleChange} invalid={touched.dataStorageMonths && !!errors.dataStorageMonths}>
                <Option value='6'>6 months</Option>
                <Option value='12'>12 months</Option>
                <Option value='24'>24 months</Option>
                <Option value='36'>36 months</Option>
                <Option value='-1'>Forever</Option>
              </Select>

              <Label>SSO</Label>
              <div className='radio-group'>
                <Radio name='ssoEnabled' value='0' onChange={setBooleanRadio('ssoEnabled')} checked={!values.ssoEnabled}>
                  No
                </Radio>
                <Radio name='ssoEnabled' value='1' onChange={setBooleanRadio('ssoEnabled')} checked={values.ssoEnabled}>
                  Yes
                </Radio>
              </div>

              <Label>Audit Trail</Label>
              <div className='radio-group'>
                <Radio name='auditTrailEnabled' value='0' onChange={setBooleanRadio('auditTrailEnabled')} checked={!values.auditTrailEnabled}>
                  No
                </Radio>
                <Radio name='auditTrailEnabled' value='1' onChange={setBooleanRadio('auditTrailEnabled')} checked={values.auditTrailEnabled}>
                  Yes
                </Radio>
              </div>

              <Label>Private Instance</Label>
              <div className='radio-group'>
                <Radio name='privateInstanceEnabled' value='0' onChange={setBooleanRadio('privateInstanceEnabled')} checked={!values.privateInstanceEnabled}>
                  No
                </Radio>
                <Radio name='privateInstanceEnabled' value='1' onChange={setBooleanRadio('privateInstanceEnabled')} checked={values.privateInstanceEnabled}>
                  Yes
                </Radio>
              </div>

              <Label htmlFor='notes'>Notes</Label>
              <TextArea
                name='notes' 
                rows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
              />

              <div className='actions'>
                <Button type='submit' className='primary'>Save Changes</Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
