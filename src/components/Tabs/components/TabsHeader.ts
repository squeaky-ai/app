import styled from 'styled-components';

const TabsHeader = styled.ul<TabsHeaderProps>`
  border-bottom: 2px solid ${({ theme }) => theme.colors.default.neutralFadedDark};
  display: flex;
  margin: 0;
  padding: 0;
`;

export interface TabsHeaderProps {}

export default TabsHeader;
