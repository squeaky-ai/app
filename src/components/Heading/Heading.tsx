import { FC } from 'react';
import HeadingTag, { HeadingTagProps } from './components/HeadingTag';

const Heading: FC<HeadingTagProps> = ({ children, ...rest }) => (
  <HeadingTag {...rest}>{children}</HeadingTag>
);

export default Heading;
