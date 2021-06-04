import type { HTMLAttributes } from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div<AlertContainerProps>`
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-left-width: 8px;
  border-radius: ${({ theme }) => theme.borders.radiusSmall};
  display: flex;
  padding: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.blue};
    font-size: 2rem;
    flex-shrink: 0;
    margin: .25rem 1rem 0 0;
  }
`;

export type AlertContainerProps = HTMLAttributes<HTMLDivElement> & {
  type?: 'success' | 'error';
}

export default AlertContainer;
