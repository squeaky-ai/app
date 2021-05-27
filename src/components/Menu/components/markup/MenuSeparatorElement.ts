import styled from 'styled-components';

const MenuSeparatorElement = styled.hr`
  height: 0.2rem;
  margin: 0.8rem auto;
  background-color: ${({ theme }) => theme.colors.default.neutralFaded};
  border: 0;
`;

export default MenuSeparatorElement;
