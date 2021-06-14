import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Tabs } from '../../../components/sites/tabs';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesTeam: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();

  return (
    <div className='page team'>
      <Head>
        <title>Squeaky / Site Team</title>
      </Head>

      <Header />

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='team' />
          <h3>Team</h3>

          <div className='container md'>
            <p>This page allows you to view, invite and manage the roles of any team members associated with this site. Adding members is always free of charge, regardless of their role.</p>
          </div>

          <div className='table'>
            <table cellSpacing='0'>
              <thead>
                <th>Name</th>
                <th>Email address</th>
                <th>Role</th>
                <th>Options</th>
              </thead>
              <tbody>
                {site.team.map(team => (
                  <tr key={team.id}>
                    <td><b>{team.user.fullName}</b></td>
                    <td>{team.user.email}</td>
                    <td>{team.role}</td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className='button primary invite-member open-modal' id='add-team-member'>
            Invite New Member
          </button>

          <h3>Roles</h3>

          <div className='container md'>
            <p>Roles are site-specific and determine what level of control individual team members have over any site they are associated with, only admins and owners can edit roles.</p>
          </div>

          <div className='roles'>
            <div className='role'>
              <h4>Owner</h4>
              <p>The site owner can:</p>
              <ul>
                <li>Manage site billing</li>
                <li>Manage team members</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>Admin</h4>
              <p>Site admins can:</p>
              <ul>
                <li>Manage team members (excluding owner)</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>User</h4>
              <p>Site users can:</p>
              <ul>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default SitesTeam;
export { getServerSideProps };
