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
import { AdminSite, PlanFeature } from 'types/graphql';

interface Props {
  site: AdminSite;
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
  teamMemberLimit: Yup.number().nullable(),
  featuresEnabled: Yup.array(Yup.string()),
});

export const SitePlanSettings: FC<Props> = ({ site }) => {
  const toasts = useToasts();

  return (
    <div className='plan-settings'>
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
          teamMemberLimit: site.plan.teamMemberLimit,
          featuresEnabled: site.plan.featuresEnabled,
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
                teamMemberLimit: values.teamMemberLimit,
                featuresEnabled: values.featuresEnabled as PlanFeature[],
              });
              toasts.add({ type: 'success', body: 'Plan settings updated' });
            } catch(error) {
              console.error(error);
              toasts.add({ type: 'error', body: 'Failed to update plan settings' });
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

              <Label>Team members</Label>
              <div className='input-group or'>
                <Input
                  name='teamMemberLimit'
                  type='number' 
                  autoComplete='off'
                  value={values.teamMemberLimit || ''} 
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span>or</span>
                <Checkbox name='teamMemberLimit' value='null' onChange={() => setFieldValue('teamMemberLimit', null)} checked={values.teamMemberLimit === null}>
                  Unlimited
                </Checkbox>
              </div>

              <Label htmlFor='dataStorageMonths'>Data retention</Label>
              <Select name='dataStorageMonths' value={values.dataStorageMonths} onChange={handleChange} invalid={touched.dataStorageMonths && !!errors.dataStorageMonths}>
                <Option value='1'>1 month</Option>
                <Option value='3'>3 months</Option>
                <Option value='6'>6 months</Option>
                <Option value='12'>12 months</Option>
                <Option value='24'>24 months</Option>
                <Option value='36'>36 months</Option>
                <Option value='-1'>Forever</Option>
              </Select>

              <Label>Features</Label>
              <div className='checkbox-group'>
                <div>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Dashboard} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Dashboard)}>
                    Dashboard
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Visitors} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Visitors)}>
                    Visitors
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Recordings} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Recordings)}>
                    Recordings
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.EventTracking} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.EventTracking)}>
                    Events
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.ErrorTracking} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.ErrorTracking)}>
                    Errors
                  </Checkbox>
                </div>
                <div>
                  <Checkbox name='featuresEnabled' value={PlanFeature.SiteAnalytics} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.SiteAnalytics)}>
                    Site Analytics
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.PageAnalytics} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.PageAnalytics)}>
                    Page Analytics
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Journeys} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Journeys)}>
                    Journeys
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.HeatmapsClickPositions} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.HeatmapsClickPositions)}>
                    Clickmaps
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.HeatmapsClickCounts} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.HeatmapsClickCounts)}>
                    Click counts
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.HeatmapsMouse} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.HeatmapsMouse)}>
                    Mouse
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.HeatmapsScroll} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.HeatmapsScroll)}>
                    Scroll
                  </Checkbox>
                </div>
                <div>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Nps} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Nps)}>
                    NPS®
                  </Checkbox>
                  <Checkbox name='featuresEnabled' value={PlanFeature.Sentiment} onChange={handleChange} checked={values.featuresEnabled.includes(PlanFeature.Sentiment)}>
                    Sentiment
                  </Checkbox>
                </div>
              </div>

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
                <Option value='72'>3 days</Option>
                <Option value='168'>7 days</Option>
                <Option value='336'>14 days</Option>
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
