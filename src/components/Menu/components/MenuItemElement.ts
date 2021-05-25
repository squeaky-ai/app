import styled from 'styled-components';

const MenuItemElement = styled.button`
  display: block;
  margin: 0;
  padding: 0.8rem 1.6rem 0.8rem 1.2rem;
  color: ${({ theme }) => theme.colors.default.neutralDark};
  text-decoration: none;

  &[href] {
    color: ${({ theme }) => theme.colors.default.neutralDark};
  }

  &:hover,
  &[href]:hover {
    color: ${({ theme }) => theme.colors.default.neutralDark};
    text-decoration: underline;
  }
`;

export default MenuItemElement;
