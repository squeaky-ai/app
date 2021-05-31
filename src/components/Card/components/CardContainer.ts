import styled from 'styled-components';

const CardContainer = styled.section<CardContainerProps>`
  background-color: ${({ theme }) => theme.colors.default.background};
  border-radius: ${({ theme }) => theme.borders.radiusSmall};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  margin: 0 0 .75rem 0;
  padding: 1.5rem;
`;

export interface CardContainerProps {}

export default CardContainer;
