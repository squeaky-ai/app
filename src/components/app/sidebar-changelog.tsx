import React from 'react';
import type { FC } from 'react';
import getConfig from 'next/config';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { ChangelogPost } from 'types/graphql';
import { Pagination } from 'components/pagination';
import { changelogViewed } from 'lib/api/graphql';

const { publicRuntimeConfig } = getConfig();

interface Props {
  disabled: boolean;
  posts: ChangelogPost[];
  changelogLength: number;
  setChangelogLastViewedAt: (viewedAt: Date) => void;
}

export const SidebarChangelog: FC<Props> = ({ disabled, posts, changelogLength, setChangelogLastViewedAt }) => {
  const ref = React.useRef<Modal>();

  const [page, setPage] = React.useState<number>(1);

  const post = posts[page - 1];
  const showCounter = changelogLength > 0;

  const openModal = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();

    const { changelogLastViewedAt } = await changelogViewed();
    setChangelogLastViewedAt(new Date(changelogLastViewedAt.iso8601));
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button disabled={disabled} onClick={openModal}>
        Changelog {showCounter && <span><span className='counter inline'>{changelogLength}</span></span>}
      </Button>

      {post && (
        <Modal ref={ref} className='md changelog-modal scrollable'>
          <ModalBody aria-labelledby='view-changelog-title'>
            <ModalHeader>
              <p id='view-changelog-title'><b>Changelog</b></p>
              <div>
                <a href={`${publicRuntimeConfig.webHost}/changelog${post.slug}`} rel='noreferrer' target='_blank' className='external-link'>
                  <Icon name='external-link-line' /> <span>Full changelog</span>
                </a>
                <Button type='button' onClick={closeModal}>
                  <Icon name='close-line' />
                </Button>
              </div>
            </ModalHeader>
            <ModalContents>
              <h1>{post.title}</h1>
              <div className='changelog-post' dangerouslySetInnerHTML={{ __html: post.body }} />
            </ModalContents>
            {posts.length > 1 && (
              <ModalFooter>
                <Pagination 
                  currentPage={page}
                  pageSize={1}
                  setPage={setPage}
                  total={posts.length}
                />
              </ModalFooter>
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
