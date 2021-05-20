import styled from 'styled-components';

const MessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 1rem 1.2rem 1rem 1.8rem;
  border: ${({ theme }) => theme.borders.defaultSize} solid
    ${({ theme }) => theme.colors.default.warning};
  border-radius: ${({ theme }) => theme.borders.radiusMedium};

  & svg {
    margin-right: 1rem;
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.default.warning};
  }

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    display: block;
    width: 0.6rem;
    content: '';
    background-color: ${({ theme }) => theme.colors.default.warning};
  }
`;

export default MessageContainer;
