import { useSectionContext } from 'components/Section';
import { FC } from 'react';
import HeadingTag, { HeadingTagProps } from './components/HeadingTag';
import { HeadingElement } from './types/HeadingElement';

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
