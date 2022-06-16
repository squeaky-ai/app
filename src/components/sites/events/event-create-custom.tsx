import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Code } from 'components/developers/code';
import { Divider } from 'components/divider';
import { DismissableMessage } from 'components/message';

export const EventCreateCustom: FC = () => (
  <div className='event-create-custom'>
    <p>We&apos;ve made it as easy as possible to define custom events, though this will require technical expertise.</p>
    <p>Custom events in Squeaky are defined using Javascript. They only require a name, but they can take extra metadata properties if required, and the syntax is as follows:</p>

    <Code lang='javascript'>
      squeaky.<span>addEvent</span>(eventName, properties);
    </Code>

    <p>Once a custom event has been captured during one of your visitor sessions we will automatically display it in your events table. You&apos;ll then be able to assign it to groups and view or compare event data like you would with any other event.</p>

    <Divider />

    <DismissableMessage 
      type='info'
      heading={<p><Icon name='question-line' /><b>Custom Events</b></p>}
      message={
        <>
          <p>To learn more about configuring custom events in Squeaky, including implementation examples, please visit our help center.</p>
          <div className='action'>
            <Link href='#'>
              <a className='button primary'>
              View Documentation
              </a>
            </Link>
          </div>
        </>
      }
    />
  </div>
);
