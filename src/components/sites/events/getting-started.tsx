import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { EventCard } from 'components/sites/events/event-card';
import { EventsType } from 'types/events';

export const GettingStarted: FC = () => (
  <>
    <Container className='md'>
      <div className='getting-started'>
        <h4>Getting started</h4>
        <p>To help you make the most out of the data you&apos;re capturing with Squeaky, we allow you to create definitions for any action that visitors are taking on your site e.g. tracking each time a visitor clicks the Login button. You can then compare how often any individual or group of events are taking place over time.</p>
        <p>In the analytics profession, these actions are referred to as <b>Events</b>. There are two different types of events that can be defined in Squeaky:</p>
      </div>

      <h5>Autocapture events</h5>
      <p>These are defined using visitor actions that we&apos;re already capturing for you, such as page views, clicks or javascript errors. The nice thing about autocapture events is that you already have all the historical data, you&apos;re just using Event definitions to help surface it.</p>

      <EventCard type={EventsType.PageVisit} />
      <EventCard type={EventsType.TextClick} />
      <EventCard type={EventsType.SelectorClick} />
      <EventCard type={EventsType.Error} />

      <h5>Custom events</h5>
      <p>These allow you to add custom tracking for almost any event you could think of e.g. every time a users action updated their shopping cart. Custom events are incredibly powerful, but technical expertise is required.</p>

      <EventCard type={EventsType.Custom} />
    </Container>
  </>
);
