import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const WidgetMagicErasure: NextPage<ServerSideProps> = () => {
  return (
    <>
      <Head>
        <title>Squeaky | Widget | Magic Erasure</title>
      </Head>

      <Main className='magic-erasure-body'>
        <Label>
          Magic Erasure
          <Icon name='information-line' />
        </Label>

        <div className='description'>
          <p>To use the magic erasure, simply click on any element on this page that you&apos;d like the Squeaky tracking code to ignore.</p>
          <p>You&apos;ll immediately see it removed from view, but only for you! Your visitors will still see every element of your site or web app, but the data will never be captured by our tracking code.</p>
          <p>Once hidden, you&apos;ll see the item listed in the Squeaky Site Widget, with the follow options:</p>
          <ul>
            <li>Hover a row to see a hidden item</li>
            <li>Click to navigate to an element</li>
            <li>Click the <Icon name='eye-line' /> icon to unhide the element</li>
          </ul>
        </div>
      </Main>
    </>
  );
};

export default WidgetMagicErasure;
export { getServerSideProps };
