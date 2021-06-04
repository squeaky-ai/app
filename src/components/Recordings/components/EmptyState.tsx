import styled from 'styled-components';

const EmptyState = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.default.backgroundAlt};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem;

  h3 {
    font-size: 3.2rem;
  }
`;

export default EmptyState;
