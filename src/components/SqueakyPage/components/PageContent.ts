import styled, { css } from 'styled-components';

const PageContent = styled.main<PageContentProps>`
  flex: 1 0 auto;
  padding: ${({ modNoPadding }) => (modNoPadding ? '0' : '4.8rem 9rem')};
  background: ${({ modNoBackground, theme }) =>
    modNoBackground ? 'transparent' : theme.colors.default.background};
  z-index: 0;

  ${({ modCenteredContent }) =>
    modCenteredContent &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

export interface PageContentProps {
  /** Renders a content centered in the window */
  modCenteredContent?: boolean;
  /** Removes the background behind the main block of the page */
  modNoBackground?: boolean;
  /** Removes internal paddings within the main block of the page */
  modNoPadding?: boolean;
}

export default PageContent;
