import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Icon } from 'components/icon';
import { EventCreate } from 'components/sites/events/event-create';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
}

export const GettingStarted: FC<Props> = ({ site, member }) => (
  <>
    <Container className='md getting-started'>
      <p>To help you make the most out of the data you&apos;re capturing with Squeaky, we allow you to create definitions for any action that visitors are taking on your site e.g. tracking each time a visitor clicks the Login button. You can then compare the actions you have defined in the events interface, to see how often they&apos;re taking place</p>

      <EventCreate 
        site={site} 
        member={member}
        buttonText='Define Your First Event'
        buttonClassName='primary'
      />

      <Card>
        <h4><Icon name='book-open-line' /> Event Types</h4>
        <p>In the analytics industry, user actions are referred to as <b>Events</b>. There are two different types of events that can be defined in Squeaky:</p>

        <div className='cols'>
          <div>
            <h5>Autocapture events</h5>
            <p>These are defined using visitor actions that we&apos;re already capturing for you, such as page views, clicks or javascript errors. The nice thing about autocapture events is that you already have all the historical data, you&apos;bre just using Event definitions to help surface it.</p>
          </div>
          <div>
            <h5>Custom events</h5>
            <p>These allow you to add custom tracking for almost any event you could think of e.g. every time a users action updated their shopping cart. Custom events are incredibly powerful, but technical expertise is required.</p>
          </div>
        </div>
      </Card>
    </Container>
  </>
);
