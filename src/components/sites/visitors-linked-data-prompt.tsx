import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Message } from 'components/message';
import { Container } from 'components/container';

export const VisitorsLinkedDataPrompt: FC = () => {
  return (
    <Container className='linked-data-prompt'>
      <Message 
        type='info'
        icon='ri-link-m'
        heading={<p className='heading'>Linked Data</p>}
        message={
          <p>The columns using the <i className='ri-link-m' /> link icon are used to display linked user data from your website or web app. To discover how you can link Squeaky visitor records directly with data of logged in users, <Link href='/developers'><a target='_blank'>click here</a></Link>.</p>
        }
      />
    </Container>
  );
};
