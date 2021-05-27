import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 8rem;
  padding: 1.6rem 3.2rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.default.neutralFaded};

  & [data-header-account-icon] {
    height: 2.4rem;
    width: 2.4rem;
  }

  & > svg {
    display: block;
    height: 3rem;
    margin-bottom: -1.2rem;
    max-height: initial;
    width: 9rem;
  }

  & > div:last-child {
    margin-left: auto;
  }
`;

export default HeaderContainer;
