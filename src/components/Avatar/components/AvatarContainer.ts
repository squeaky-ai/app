import styled from 'styled-components';

const AvatarContainer = styled.div<AvatarContainerProps>`
  background: ${({ theme }) => theme.colors.default.neutralFadedDark};
  border-radius: 50%;
  height: 3.2rem;
  width: 3.2rem;
`;

export interface AvatarContainerProps {
  src?: string;
}

export default AvatarContainer;
