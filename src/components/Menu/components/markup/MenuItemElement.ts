import styled from 'styled-components';

const MenuItemElement = styled.button`
  display: block;
  margin: 0;
  padding: 0.8rem 1.6rem 0.8rem 1.2rem;
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.default.neutralDark};
  text-decoration: none;

  &[href] {
    color: ${({ theme }) => theme.colors.default.neutralDark};
  }

  &:hover,
  &[href]:hover {
    background: ${({ theme }) => theme.colors.default.neutralFaded};
    color: ${({ theme }) => theme.colors.default.neutralDark};
  }
`;

export default MenuItemElement;
