import styled from 'styled-components';

const MenuContainer = styled.div`
  position: relative;

  & > [aria-controls] > svg:last-child {
    height: 1.6rem;
  }
`;

export default MenuContainer;
