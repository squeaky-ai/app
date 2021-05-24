import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  height: 8rem;
  padding: 3.2rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.default.neutralFaded};

  & > svg {
    display: block;
    height: 3rem;
    margin-bottom: -1.6rem;
    max-height: initial;
    width: 9rem;
  }
`;

export default HeaderContainer;
