import styled, { css } from 'styled-components';

const TabsBodyItem = styled.div<TabsBodyItemProps>`
  padding: 4rem 0 0 0;

  ${({ active }) => !active && css`
    display: none;
  `}
`;

export interface TabsBodyItemProps {
  active?: boolean;
}

export default TabsBodyItem;
