import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Tabs } from 'components/users/tabs';
import { Main } from 'components/main';
import { Toggle } from 'components/toggle';
import { Error } from 'components/error';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { updateUserCommunication } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { useCommunication } from 'hooks/use-communication';
import { UsersCommunication } from 'types/graphql';

const UsersPreferences: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();

  const { communication, error, loading } = useCommunication();

  const handleToggle = (type: keyof UsersCommunication) => {
    return async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      try {
        await updateUserCommunication({ [type]: checked });
        toasts.add({ type: 'success', body: 'Your preferences have been successfully updated.' });
      } catch(error) {
        console.error(error);
        toasts.add({ type: 'error', body: 'There was an issue updating your preferences' });
      }
    };
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | User - Preferences</title>
      </Head>

      <Main>
        <h3 className='title'>Account Settings</h3>

        <Tabs user={user} page='preferences' />

        <p>To manage your communication preferences, simple choose from the options below:</p>

        {!loading && (
          <Container className='md'>
            <ul className='email-options'>
              <li>
                <Toggle checked={communication.onboardingEmail} onChange={handleToggle('onboardingEmail')}>
                  Onboarding
                </Toggle>
                <p>In your first week using Squeaky we&apos;ll sending you 4-6 emails with tips on how to get set up and start making the most of the data you&apos;re capturing.</p>
              </li>
              <li>
                <Toggle checked={communication.weeklyReviewEmail} onChange={handleToggle('weeklyReviewEmail')}>
                  Weekly Review
                </Toggle>
                <p>Receive 1 email per week that contains a snapshot of your key analytics data and user feedback from the past week.</p>
              </li>
              <li>
                <Toggle checked={communication.monthlyReviewEmail} onChange={handleToggle('monthlyReviewEmail')}>
                  Monthly Review
                </Toggle>
                <p>Receive 1 email per month that contains a snapshot of your key analytics data and user feedback from the past month.</p>
              </li>
              <li>
                <Toggle checked={communication.productUpdatesEmail} onChange={handleToggle('productUpdatesEmail')}>
                  Product Updates
                </Toggle>
                <p>Receive an email from Squeaky when we announce major updates to our product such as new features and functionality. We update the app daily, but we aim to limit Product Update emails to no more than once per month.</p>
              </li>
              <li>
                <Toggle checked={communication.marketingAndSpecialOffersEmail} onChange={handleToggle('marketingAndSpecialOffersEmail')}>
                  Marketing &amp; Special Offers
                </Toggle>
                <p>No more than 3-5 times per year we like to share special offers and other marketing related announcements about the great things Squeaky can do for your business.</p>
              </li>
              <li>
                <Toggle checked={communication.knowledgeSharingEmail} onChange={handleToggle('knowledgeSharingEmail')}>
                  Knowledge Sharing
                </Toggle>
                <p>Receive one email per quarter containing links to the top content that Squeaky has published that quarter. Topics include Product, UX, Marketing, Conversion and Customer Success.</p>
              </li>
            </ul>
          </Container>
        )}
      </Main>
    </>
  );
};

export default UsersPreferences;
export { getServerSideProps };
