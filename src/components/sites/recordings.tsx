import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Pagination } from 'components/pagination';
import { Container } from 'components/container';
import { Tooltip } from 'components/tooltip';
import { Highlighter } from 'components/highlighter';
import { useRecordings } from 'hooks/recordings';
import { MIN_SEARCH_CHARS } from 'data/sites/constants';

export const Recordings: FC = () => {
  const router = useRouter();

  const [page, setPage] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>('');
  const [sort, setSort] = React.useState<'ASC' | 'DESC'>('DESC');

  setSort;

  const [loading, recordings] = useRecordings({ 
    page, 
    sort,
    query: query.length < MIN_SEARCH_CHARS ? '' : query, // No point in searching if it's below this value
  });

  const hasRecordings = recordings.items.length > 0;

  const handleSearch = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setQuery(element.value);
  }, 200);

  const handleCancel = () => {
    setQuery('');

    const search = document.querySelector<HTMLInputElement>('#search');
    search.value = '';
    search.focus();
  };

  const viewRecording = async (id: string) => {
    await router.push(`/sites/${router.query.site_id}/player?recording_id=${id}`);
  };

  const deviceIcon = (deviceType: string) => deviceType === 'Computer'
    ? 'ri-computer-line' 
    : 'ri-smartphone-line';

  const browserIcon = (browser: string) => browser.toLowerCase().replace(' ', '-');

  return (
    <Main className={classnames('recordings', { empty: !hasRecordings })}>
      <h3 className='title'>
        Recordings
        <div className='search' role='search' aria-label='Filter recordings'>
          <Input type='search' placeholder='Search...' onKeyUp={handleSearch} id='search' />
          {query && (
            <Button onClick={handleCancel}>
              <i className='ri-close-line' />
            </Button>
          )}
          <i className='ri-search-line' /> 
        </div>
      </h3>

      {!loading && (
        <Container className='xl centered empty-state'>
          <div className='empty-state-contents'>
            <Image src='/empty-state-4.svg' height={240} width={320} alt='Illustration to represent that there were no search results' />
            <h4 className='sub-heading'>There are no recordings matching your search.</h4>
          </div>
        </Container>
      )}
    
      <div className='table recordings-list'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Session #</th>
              <th>User</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Language</th>
              <th>Pages</th>
              <th>Start &amp; Exit URL</th>
              <th>Device type</th>
              <th>Viewport (px)</th>
              <th>Browser</th>
            </tr>
          </thead>
          <tbody>
            {recordings.items.map(recording => (
              <tr 
                className='hover' 
                key={recording.id} 
                role='link' 
                data-href={`/sites/${router.query.site_id}/player?recording_id=${recording.id}`} 
                onClick={() => viewRecording(recording.id)} 
                tabIndex={0}
              >
                <td><span className={classnames('indicator', { active: recording.active })} /><Highlighter value={query}>{recording.id}</Highlighter></td>
                <td><Highlighter value={query}>{recording.viewerId}</Highlighter></td>
                <td><Highlighter value={query}>{recording.dateString}</Highlighter></td>
                <td><Highlighter value={query}>{recording.durationString}</Highlighter></td>
                <td><Highlighter value={query}>{recording.language}</Highlighter></td>
                <td>
                  <Tooltip button={recording.pageCount} buttonClassName='link'>
                    <ul className='tooltip-list'>
                      {recording.pages.map(page => (
                        <li key={page}>{page}</li>
                      ))}
                    </ul>
                  </Tooltip>
                </td>
                <td>
                  <table className='start-exit-page'>
                    <tbody>
                      <tr>
                        <td>START URL</td>
                        <td><Highlighter value={query}>{recording.startPage}</Highlighter></td>
                      </tr>
                      <tr>
                        <td>EXIT URL</td>
                        <td><Highlighter value={query}>{recording.exitPage}</Highlighter></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <i className={classnames('device', deviceIcon(recording.deviceType))} />
                  <Highlighter value={query}>{recording.deviceType}</Highlighter>
                </td>
                <td><Highlighter value={query}>{recording.viewportX}</Highlighter> x <Highlighter value={query}>{recording.viewportY}</Highlighter></td>
                <td>
                  <Tooltip positionX='right' button={<Image src={`/browsers/${browserIcon(recording.browser)}.svg`} height={24} width={24} alt={`Icon for the ${recording.browser} browser`} />}>
                    {recording.browserString}
                  </Tooltip>
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
