import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import type { Site } from 'types/site';

interface Props {
  page: string | null;
  setPage: (page: string) => void;
}

const PageSchema = Yup.object().shape({
  page: Yup.string(),
});

const QUERY = gql`
  query GetSitePages($siteId: ID!) {
    site(siteId: $siteId) {
      id
      pages
    }
  }
`;

export const HeatmapsPages: FC<Props> = ({ page, setPage }) => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const pages = data ? data.site.pages : [];

  const results = [...pages].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ page: page || '' }}
      validationSchema={PageSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        setPage(values.page);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='heatmaps-pages' onSubmit={handleSubmit}>
          <Label htmlFor='page-search'>Page</Label>
          {loading && <Spinner />}
          <Select onChange={handleChange} value={values.page}>
            {results.map(page => (
              <Option key={page} value={page}>
                {page}
              </Option>
            ))}
          </Select>
          <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
        </form>
      )}
    </Formik>
  );
};
