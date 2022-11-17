import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';

export const Roles: FC = () => (
  <div className='roles'>
    <div className='role'>
      <h5>Owner</h5>
      <p>The site owner can access or manage:</p>
      <ul>
        <li><Icon name='check-line' /> Subscription and billing settings</li>
        <li><Icon name='check-line' /> Team member settings</li>
        <li><Icon name='check-line' /> Site settings</li>
        <li><Icon name='check-line' /> Privacy settings</li>
        <li><Icon name='check-line' /> All analysis functionality</li>
        <li><Icon name='check-line' /> All data capture functionality</li>
        <li><Icon name='check-line' /> All feedback functionality</li>
      </ul>
    </div>
    <div className='role'>
      <h5>Admin</h5>
      <p>Site admins can access or manage:</p>
      <ul>
        <li><Icon name='check-line' /> Team member settings</li>
        <li><Icon name='check-line' /> Site settings</li>
        <li><Icon name='check-line' /> Privacy settings</li>
        <li><Icon name='check-line' /> All analysis functionality</li>
        <li><Icon name='check-line' /> All data capture functionality</li>
        <li><Icon name='check-line' /> All feedback functionality</li>
      </ul>
    </div>
    <div className='role'>
      <h5>User</h5>
      <p>Site users can access:</p>
      <ul>
        <li><Icon name='check-line' /> All analysis functionality</li>
        <li><Icon name='check-line' /> All data capture functionality</li>
        <li><Icon name='check-line' /> All feedback functionality</li>
      </ul>
      <p>Site users cannot:</p>
      <ul>
        <li><Icon name='close-line' className='negative' /> Delete data e.g. visitors, recordings, feedback</li>
      </ul>
    </div>
    <div className='role'>
      <h5>Read-only</h5>
      <p>Read-only users can access:</p>
      <ul>
        <li><Icon name='check-line' /> All analysis data</li>
        <li><Icon name='check-line' /> All data capture data</li>
        <li><Icon name='check-line' /> All feedback data</li>
      </ul>
      <p>Site read-only users cannot:</p>
      <ul>
        <li><Icon name='close-line' className='negative' /> Edit, Add or Delete data e.g. visitors, recordings, feedback, Notes &amp; Tags.</li>
      </ul>
    </div>
  </div>
);
