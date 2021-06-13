import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props {
  password: string;
}

export const Password: FC<Props> = ({ password }) => (
  <div className='password'>
    <p>Please use at least:</p>
    <ul>
      <li className={classnames({ valid: /[A-Z]/.test(password) })}>
        <i className='ri-close-line cross' />
        <i className='ri-check-line tick' />
        1 uppercase character
      </li>
      <li className={classnames({ valid: /[0-9]/.test(password) })}>
        <i className='ri-close-line cross' />
        <i className='ri-check-line tick' />
        1 numeric character
      </li>
      <li className={classnames({ valid: /[a-z]/.test(password) })}>
        <i className='ri-close-line cross' />
        <i className='ri-check-line tick' />
        1 lowercase character
      </li>
      <li className={classnames({ valid: /.{8}/.test(password) })}>
        <i className='ri-close-line cross' />
        <i className='ri-check-line tick' />
        8 characters
      </li>
    </ul>
  </div>  
);
