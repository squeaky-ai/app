import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { format, subMonths } from 'date-fns';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalContents, ModalHeader, ModalFooter } from 'components/modal';
import { DatePicker } from 'components/date-picker';
import { YYYY_MM_DD_REGEX } from 'data/common/constants';
import { DataExportTypes } from 'data/sites/enums';
import { Label } from 'components/label';
import { Option, Select } from 'components/select';
import { createDataExport } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

const DateStringSchema = Yup.string().matches(YYYY_MM_DD_REGEX, 'Date must be formatted as yyyy/mm/dd');

const ExportSchema = Yup.object().shape({
  exportType: Yup.number().required('Export type is required'),
  startDate: DateStringSchema.required(),
  endDate: DateStringSchema.required(),
});

export const SettingsDataExportModal: FC<Props> = ({ site }) => {
  const ref = React.useRef<Modal>();

  const toasts = useToasts();

  const now = new Date().valueOf();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='primary export-csv' onClick={openModal}>
        Export .csv
      </Button>

      <Modal ref={ref} className='sm-md export-csv-modal'>
        <Formik
          initialValues={{
            exportType: DataExportTypes.Recordings,
            startDate: format(subMonths(now, 3), 'yyyy-MM-dd'),
            endDate: format(now, 'yyyy-MM-dd'),
          }}
          validationSchema={ExportSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              setSubmitting(false);

              try {
                await createDataExport({
                  siteId: site.id,
                  startDate: values.startDate,
                  endDate: values.endDate,
                  exportType: values.exportType,
                });

                toasts.add({ type: 'success', body: 'Data export creates successfully' });
                closeModal();
              } catch(error) {
                console.error(error);
                toasts.add({ type: 'error', body: 'Failed to create data export' });
              }
            })();
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <ModalHeader>
                  <p><b>Export data to .csv</b></p>
                  <Button className='close' type='button' onClick={() => closeModal()}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='exportType'>Export Type</Label>
                  <Select
                    value={values.exportType}
                    name='exportType'
                    onBlur={handleBlur}
                    onChange={(event) => setFieldValue('exportType', Number(event.target.value))}
                  >
                    <Option value={DataExportTypes.Recordings}>Recordings data</Option>
                    <Option value={DataExportTypes.Visitors}>Visitors data</Option>
                  </Select>

                  <div className='date-range'>
                    <div>
                      <Label htmlFor='startDate'>From</Label>
                      <DatePicker 
                        name='startDate'
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <span>-</span>
                    <div>
                      <Label htmlFor='endDate'>Until</Label>
                      <DatePicker 
                        name='endDate'
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className='data-included'>
                    <Label>Data included</Label>

                    {values.exportType === DataExportTypes.Recordings && (
                      <ul>
                        <li>Status</li>
                        <li>Traffic source</li>
                        <li>Recording ID</li>
                        <li>Start URL</li>
                        <li>Visitor ID</li>
                        <li>Exit URL</li>
                        <li>User ID <i>(if present)</i></li>
                        <li>Device</li>
                        <li>Name <i>(if present)</i></li>
                        <li>Viewport dimension</li>
                        <li>Email <i>(if present)</i></li>
                        <li>Country</li>
                        <li>Date &amp; Time</li>
                        <li>Browser</li>
                        <li>Duration</li>
                        <li>NPS rating <i>(if present)</i></li>
                        <li>Activity</li>
                        <li>Sentiment rating <i>(if present)</i></li>
                        <li>Pages</li>
                      </ul>
                    )}

                    {values.exportType === DataExportTypes.Visitors && (
                      <ul>
                        <li>Status</li>
                        <li>First visited</li>
                        <li>Visitor ID</li>
                        <li>Last activity</li>
                        <li>User ID <i>(if present)</i></li>
                        <li>Languages</li>
                        <li>Name <i>(if present)</i></li>
                        <li>Browsers</li>
                        <li>Email <i>(if present)</i></li>
                        <li>Countries</li>
                        <li>Recordings count</li>
                        <li>Source</li>
                      </ul>
                    )}
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Export .csv
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
