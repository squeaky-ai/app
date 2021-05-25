import styled from 'styled-components';

const MenuDropdown = styled.ul`
  position: absolute;
  right: 0;
  top: calc(100% + 0.8rem);
  margin: 0;
  min-width: 16rem;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.default.background};
  border-radius: ${({ theme }) => theme.borders.radius};
  box-shadow: 0 0 1.2rem 0 rgba(0, 0, 0, 0.15);
  list-style: none;
  z-index: ${({ theme }) => theme.stack.elevation.dropdown};
  white-space: nowrap;
`;

export default MenuDropdown;
