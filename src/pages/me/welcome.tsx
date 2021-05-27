import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Heading from 'components/Heading';
import SqueakyPage from 'components/SqueakyPage';
import Stack from 'components/Stack';
import TextInput from 'components/TextInput';
import ValidationMessage from 'components/ValidationMessage';

const SitesIndex: NextPage = () => {
  const { t } = useTranslation('account');

  return (
    <SqueakyPage>
      <Stack>
        <Stack.Item modSpaceLarge>
          <Heading modSubsection>{t('pages.settings')}</Heading>
        </Stack.Item>
        <Stack.Item>
          <ValidationMessage modInformation>{t('welcome.explanation')}</ValidationMessage>
        </Stack.Item>
        <Stack.Item>
          <TextInput labelText={t('fields.email')} />
        </Stack.Item>
        <Stack.Item>
          <TextInput labelText={t('fields.firstName')} />
        </Stack.Item>
        <Stack.Item>
          <TextInput labelText={t('fields.lastName')} />
        </Stack.Item>
      </Stack>
    </SqueakyPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['account'])),
  },
});

export default SitesIndex;
