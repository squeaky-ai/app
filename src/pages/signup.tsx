import { NextPage } from 'next';
import React from 'react';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Box from 'components/Box';
import Stack from 'components/Stack';

const SignupPage: NextPage = () => (
  <Stack modCenter modFullHeight>
    <Box modNarrow>
      <Stack>
        <Stack.Item modSpaceLarge>
          <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
        </Stack.Item>
        <Heading modFormHeading modSpaceAfter>
          Sign Up
        </Heading>
        <Button modFullWidth>Continue</Button>
      </Stack>
    </Box>
  </Stack>
);

export default SignupPage;
