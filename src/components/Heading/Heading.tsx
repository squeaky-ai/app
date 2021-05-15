import React from 'react';
import type { FC } from 'react';
import { useSectionContext } from 'components/Section';
import type { HeadingTagProps } from './components/HeadingTag';
import HeadingTag from './components/HeadingTag';
import type { HeadingElement } from './types/HeadingElement';

const Heading: FC<HeadingTagProps> = ({ children, ...rest }) => {
  const headingLevel = useSectionContext();
  const headingTag = `h${headingLevel}` as HeadingElement;

  return (
    <HeadingTag as={headingTag} {...rest}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
