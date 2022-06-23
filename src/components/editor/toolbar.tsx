import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { ToolbarButton } from 'components/editor/toolbar-button';
import { Embed } from 'components/editor/embed';
import { Image } from 'components/editor/image';
import { Select, Option } from 'components/select';
import type { Quill } from 'quill';

interface Props {
  editor: Quill;
  images: string[];
  refetchImages: VoidFunction;
}

export const Toolbar: FC<Props> = ({ editor, images, refetchImages }) => (
  <div id='toolbar'>
    <div className='group'>
      <Select selectClassName='ql-header'>
        <Option value='1'>Heading 1</Option>
        <Option value='2'>Heading 2</Option>
        <Option value='3'>Heading 3</Option>
        <Option value='4'>Heading 4</Option>
        <Option value='5'>Heading 5</Option>
        <Option value=''>Normal</Option>
      </Select>
    </div>

    <div className='group'>
      <ToolbarButton className='ql-bold' description='Bold'>
        <Icon name='bold' />
      </ToolbarButton>
      <ToolbarButton className='ql-italic' description='Italic'>
        <Icon name='italic' />
      </ToolbarButton>
      <ToolbarButton className='ql-underline' description='Underline'>
        <Icon name='underline' />
      </ToolbarButton>
      <ToolbarButton className='ql-strike' description='Strikethrough'>
        <Icon name='strikethrough' />
      </ToolbarButton>
    </div>

    <div className='group'>
      <ToolbarButton className='ql-blockquote' description='Quote'>
        <Icon name='double-quotes-r' />
      </ToolbarButton>
      <ToolbarButton className='ql-code-block' description='Code'>
        <Icon name='code-line' />
      </ToolbarButton>
    </div>

    <div className='group'>
      <ToolbarButton className='ql-list' value='ordered' description='Ordered list'>
        <Icon name='list-ordered' />
      </ToolbarButton>
      <ToolbarButton className='ql-list' value='bullet' description='Unordered list'>
        <Icon name='list-unordered' />
      </ToolbarButton>
    </div>

    <div className='group'>
      <ToolbarButton className='ql-link' description='Link'>
        <Icon name='link' />
      </ToolbarButton>
    </div>

    <div className='group'>
      <Image editor={editor} images={images} refetchImages={refetchImages} />
      <Embed editor={editor} />
    </div>
  </div>
);
