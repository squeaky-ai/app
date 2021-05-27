import styled from 'styled-components';

const PageContent = styled.main<PageContentProps>`
  flex: 1 0 auto;
  padding: ${({ modNoPadding }) => (modNoPadding ? '0' : '4.8rem 9rem')};
  background: ${({ modNoBackground, theme }) =>
    modNoBackground ? 'transparent' : theme.colors.default.background};
`;

export interface PageContentProps {
  /** Removes the background behind the main block of the page */
  modNoBackground?: boolean;
  /** Removes internal paddings within the main block of the page */
  modNoPadding?: boolean;
}

export default PageContent;
