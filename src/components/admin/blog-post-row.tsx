import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Row, Cell } from 'components/table';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { Icon } from 'components/icon';
import { BlogDelete } from 'components/admin/blog-delete';
import { toNiceDate } from 'lib/dates';
import type { BlogPost } from 'types/graphql';

interface Props {
  post: BlogPost;
}

export const BlogPostRow: FC<Props> = ({ post }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row key={post.slug}>
      <Cell>{post.id}</Cell>
      <Cell>
        <Link href={`/__admin/blog${post.slug}`}>
          {post.title}
        </Link>
      </Cell>
      <Cell>{post.category}</Cell>
      <Cell>{post.tags.join(', ')}</Cell>
      <Cell className='author'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.author.image} height={24} width={24} alt={`Image of the author ${post.author.name}`} />
        {post.author.name}
      </Cell>
      <Cell>
        {post.draft 
          ? <Pill className='tertiary'>Yes</Pill>
          : <Pill className='primary'>No</Pill>
        }
      </Cell>
      <Cell>{toNiceDate(post.createdAt)}</Cell>
      <Cell>{toNiceDate(post.updatedAt)}</Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <BlogDelete 
            id={post.id} 
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
