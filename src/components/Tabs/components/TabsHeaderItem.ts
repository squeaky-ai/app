import styled, { css } from 'styled-components';

const TabsHeaderItem = styled.li<TabsHeaderItemProps>`
  list-style: none;
  margin: 0 2.5rem -2px 0;

  a {
    align-items: center;
    border-radius: 0;
    border-bottom: 3px solid transparent;
    color: ${({ theme }) => theme.colors.default.neutralMedium};
    display: flex;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    padding: 0 0 1.25rem 0;
    text-decoration: none;

    &:hover {
      border-color: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.default.neutralMedium};
    }
  
    svg {
      font-size: 2.5rem;
      font-weight: ${({ theme }) => theme.typography.weights.normal};
      margin-right: 1rem;
    }
  
    ${({ active }) => active && css`
      color: ${({ theme }) => theme.colors.default.neutralDark};
      border-color: ${({ theme }) => theme.colors.blue};
  
      svg {
        color: ${({ theme }) => theme.colors.blue};
      }
    `};
  }
`;

export interface TabsHeaderItemProps {
  active?: boolean;
}

export default TabsHeaderItem;
