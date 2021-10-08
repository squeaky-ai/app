import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Drawer } from 'components/drawer';

export const SettingsPrivacy: FC = () => {
  return (
    <Drawer title='Privacy' name='privacy'>
      <Container className='md'>
        <p>At Squeaky we <b>automatically anonymise all data that users input into forms</b>. If there are other types of content you don’t want to record then you can <b>manually apply the following class names</b> to the relevant elements in your codebase:</p>
        <ul className='privacy-code'>
          <li>An element with the class name <code className='code'>.squeaky-hide</code> will not be recorded. Instead, it will replay as a placeholder with the same dimension.</li>
          <li>All text of elements with the class name <code className='code'>.squeaky-mask</code> and their children will be masked.</li>
        </ul>
      </Container>
    </Drawer>
  );
};
