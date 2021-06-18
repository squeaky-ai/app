import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import locales from '../../data/locales.json';
import { Button } from '../../components/button';
import { GET_RECORDINGS_QUERY } from '../../data/recordings/queries';
import type { Site } from '../../types/site';

interface Props {
  site: Site;
}

export const RecordingsList: FC<Props> = ({ site }) => {
  const router = useRouter();
  
  const { data, fetchMore } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { id: site.id, cursor: '' }
  });

  const deviceIcon = (device: string = '') => {
    // TODO this list will need to change
    switch(device.toLowerCase()) {
      case 'mobile':
        return 'ri-smartphone-line';
      case 'tablet':
        return 'ri-tablet-line';
      default:
        return 'ri-computer-line';
    }
  };

  const duration = (seconds: number) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };

  const viewRecording = async (id: string) => {
    await router.push(`/sites/${site.id}/recordings/${id}`);
  };

  const language = (locale: string) => {
    const language = locales[locale.toLowerCase().replace('-', '_')];
    return language || 'Unknown';
  };

  const nextPage = async () => {
    await fetchMore({ 
      variables: { 
        cursor: data.site.recordings.pagination.cursor 
      } 
    });
  };

  if (!data) return null;

  return (
    <>
      <div className='table recordings-list'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Status</th>
              <th>Session #</th>
              <th>User</th>
              <th>Language</th>
              <th>Duration</th>
              <th>Pages</th>
              <th>Start &amp; Exit URL</th>
              <th>Device type</th>
              <th>Viewport (px)</th>
              <th>Browser</th>
            </tr>
          </thead>
          <tbody>
            {data.site.recordings.items.map(recording => (
              <tr className='hover' key={recording.id} role='button' onClick={() => viewRecording(recording.id)}>
                <td>
                  <span className={classnames('indicator', { active: recording.active })} />
                  {recording.active ? 'Active' : 'Recorded'}
                </td>
                <td>{recording.id}</td>
                <td>{recording.viewerId}</td>
                <td>{language(recording.locale)}</td>
                <td>{duration(recording.duration)}</td>
                <td><a href='#'>{recording.pageCount}</a></td>
                <td>
                  <table className='start-exit-page'>
                    <tbody>
                      <tr>
                        <td>START URL</td>
                        <td>{recording.startPage}</td>
                      </tr>
                      <tr>
                        <td>EXIT URL</td>
                        <td>{recording.exitPage}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <i className={classnames('device', deviceIcon(recording.deviceType))} />
                  {recording.deviceType || 'Unknown'}
                </td>
                <td>{recording.viewportX} x {recording.viewportY}</td>
                <td>
                  <Image src={`/browsers/${recording.browser.toLowerCase()}.svg`} height={24} width={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!data.site.recordings.pagination.isLast && (
        <Button className='link' onClick={nextPage}>
          Load next
        </Button>
      )}
    </>
  );
};
