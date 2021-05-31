import React from 'react';
import type { FC } from 'react';
import type { AvatarContainerProps } from './components/AvatarContainer';
import AvatarContainer from './components/AvatarContainer';

const Avatar: FC<AvatarContainerProps> = ({ src }) => (
  <AvatarContainer>
    {src ? <img src={src} /> : null}
  </AvatarContainer>
);

export default Avatar;
