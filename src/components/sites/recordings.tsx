import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Input } from 'components/input';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { getDeviceIcon, getDuration } from 'lib/sites';
import { useRecordings } from 'hooks/recordings';

export const Recordings: FC = () => {
  const router = useRouter();

  const [page, setPage] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>('');

  const recordings = useRecordings({ page, query });
  const hasRecordings = recordings.items.length > 0;

  const handleSearch = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setQuery(element.value);
  }, 200);

  const viewRecording = async (id: string) => {
    await router.push(`/sites/${router.query.site_id}/player?recording_id=${id}`);
  };

  return (
    <Main className={classnames('recordings', { 'empty': !hasRecordings })}>
      <h3 className='title'>
        Recordings
        <div className='search'>
          <Input type='search' placeholder='Search...' onKeyUp={handleSearch} />
          <i className='ri-search-line' /> 
        </div>
      </h3>

      <Container className='xl centered empty-state'>
        <div className='empty-state-contents'>
          <Image src='/empty-state-4.svg' height={240} width={320} />
          <h4 className='sub-heading'>There are no recordings matching your search.</h4>
        </div>
      </Container>
    
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
            {recordings.items.map(recording => (
              <tr className='hover' key={recording.id} role='button' onClick={() => viewRecording(recording.id)}>
                <td>
                  <span className={classnames('indicator', { active: recording.active })} />
                  {recording.active ? 'Active' : 'Recorded'}
                </td>
                <td>{recording.id}</td>
                <td>{recording.viewerId}</td>
                <td>{recording.language}</td>
                <td>{getDuration(recording.duration)}</td>
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
                  <i className={classnames('device', getDeviceIcon(recording.deviceType))} />
                  {recording.deviceType}
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

      <Pagination 
        page={page} 
        setPage={setPage}
        {...recordings.pagination}
      />
    </Main>
  );
};
