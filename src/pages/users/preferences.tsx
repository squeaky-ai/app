import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'components/container';
import { Tabs } from 'components/users/tabs';
import { Option, Select } from 'components/select';
import { Main } from 'components/main';
import { Toggle } from 'components/toggle';
import { Error } from 'components/error';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { updateUserCommunication } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { useCommunication } from 'hooks/use-communication';
import { timezones } from 'data/users/constants';
import { Preferences, Preference } from 'lib/preferences';
import { UsersCommunication } from 'types/graphql';
import { Radio } from 'components/radio';

const UsersPreferences: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const toasts = useToasts();

  const [timezone, setTimezone] = React.useState<string>('UTC');

  const { communication, error, loading } = useCommunication();

  const usersTimezone = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'Unknown'
    }
  })();

  const handleToggleCommunication = (type: keyof UsersCommunication) => {
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

  const handleTimezoneChange = (value: string) => {
    setTimezone(value);
    Preferences.setString(Preference.TIMEZONE, value);
    
    // This happens because it's a header, and all the GQL
    // data in the cache will be wrong. I hate it, but
    // flushing select parts of the cache is difficult
    location.href = location.href + '?timezone_updated=1';
  };

  React.useEffect(() => {
    const tz = Preferences.getString(Preference.TIMEZONE);
    if (tz) setTimezone(tz);

    if (location.search.includes('timezone_updated')) {
      toasts.add({ type: 'success', body: 'Your timezone has been successfully updated.' });
      router.replace(router.asPath.split('?')[0], undefined, { shallow: true });
    }
  }, []);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | User - Preferences</title>
      </Head>

      <Main>
        <h4 className='title'>Account Settings</h4>

        <Tabs page='preferences' />

        {!loading && (
          <Container className='md'>
            <h4>Timezone</h4>
            <p>By default we display all times in <Link href='https://en.wikipedia.org/wiki/Coordinated_Universal_Time' target='_blank' rel='noreferrer'>Coordinated Universal Time</Link> or UTC, as this is the primary time standard by which the world regulates clocks and time. If you would like the times used to display data in Squeaky to align with another timezone, you can do so using the options below.</p>

            <div className='timezones'>
              <Radio value='UTC' checked={timezone === 'UTC'} onChange={() => handleTimezoneChange('UTC')}>
                Default timezone <i>(UTC)</i>
              </Radio>
              <Radio value={usersTimezone} checked={timezone === usersTimezone} onChange={() => handleTimezoneChange(usersTimezone)}>
                Current local timezone <i>({ usersTimezone })</i>
              </Radio>
              <Radio checked={!['UTC', usersTimezone].includes(timezone)} className='select-timezone'>
                <span>Select timezone</span>
                <Select value={timezone} onChange={(event) => handleTimezoneChange(event.target.value)} className='timezone'>
                  {timezones.map(timezone => (
                    <Option key={timezone} value={timezone}>
                      {timezone}
                    </Option>
                  ))}
                </Select>
              </Radio>
            </div>

            <p><b>Please note</b>: This change will only apply to your own user account.</p>

            <h4>Communications</h4>

            <p>To manage your communication preferences, simple choose from the options below:</p>

            <ul className='email-options'>
              <li>
                <Toggle checked={communication.onboardingEmail} onChange={handleToggleCommunication('onboardingEmail')}>
                  Onboarding
                </Toggle>
                <p>In your first week using Squeaky we&apos;ll sending you 4-6 emails with tips on how to get set up and start making the most of the data you&apos;re capturing.</p>
              </li>
              <li>
                <Toggle checked={communication.weeklyReviewEmail} onChange={handleToggleCommunication('weeklyReviewEmail')}>
                  Weekly Review
                </Toggle>
                <p>Receive 1 email per week that contains a snapshot of your key analytics data and user feedback from the past week.</p>
              </li>
              <li>
                <Toggle checked={communication.productUpdatesEmail} onChange={handleToggleCommunication('productUpdatesEmail')}>
                  Product Updates
                </Toggle>
                <p>Receive an email from Squeaky when we announce major updates to our product such as new features and functionality. We update the app daily, but we aim to limit Product Update emails to no more than once per month.</p>
              </li>
              <li>
                <Toggle checked={communication.marketingAndSpecialOffersEmail} onChange={handleToggleCommunication('marketingAndSpecialOffersEmail')}>
                  Marketing &amp; Special Offers
                </Toggle>
                <p>No more than 3-5 times per year we like to share special offers and other marketing related announcements about the great things Squeaky can do for your business.</p>
              </li>
              <li>
                <Toggle checked={communication.knowledgeSharingEmail} onChange={handleToggleCommunication('knowledgeSharingEmail')}>
                  Knowledge Sharing
                </Toggle>
                <p>Receive one email per quarter containing links to the top content that Squeaky has published that quarter. Topics include Product, UX, Marketing, Conversion and Customer Success.</p>
              </li>
              <li>
                <Toggle checked={communication.feedbackEmail} onChange={handleToggleCommunication('feedbackEmail')}>
                  Feedback
                </Toggle>
                <p>Receive summary email notifications if you have received any NPS® or Sentiment survey feedback during the past hour.</p>
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
