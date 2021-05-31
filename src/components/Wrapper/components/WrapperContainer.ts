import styled from 'styled-components';

const WrapperContainer = styled.div<WrapperContainerProps>`
  margin: 0 auto;
  max-width: ${({ size }) => {
    switch(size) {
      case 'sm': return '540px';
      case 'md': return '768px';
      case 'lg': return '1280px';
    }
  }};
`;

export interface WrapperContainerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default WrapperContainer;
