import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import classnames from 'classnames';

interface Props {
  password: string;
}

export const Password: FC<Props> = ({ password }) => (
  <div className='password'>
    <p>Please use at least:</p>
    <ul>
      <li className={classnames({ valid: /[A-Z]/.test(password) })}>
        <Icon name='close-line cross' />
        <Icon name='check-line tick' />
        1 uppercase character
      </li>
      <li className={classnames({ valid: /[0-9]/.test(password) })}>
        <Icon name='close-line cross' />
        <Icon name='check-line tick' />
        1 numeric character
      </li>
      <li className={classnames({ valid: /[a-z]/.test(password) })}>
        <Icon name='close-line cross' />
        <Icon name='check-line tick' />
        1 lowercase character
      </li>
      <li className={classnames({ valid: /.{8}/.test(password) })}>
        <Icon name='close-line cross' />
        <Icon name='check-line tick' />
        8 characters
      </li>
    </ul>
  </div>  
);
