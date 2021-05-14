import styled, { css } from 'styled-components';

const HeadingTag = styled.h1<HeadingTagProps>`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.default.neutralDark};
  font-family: ${({ theme }) => theme.typography.stack};
  font-weight: ${({ theme }) => theme.typography.weights.heavy};
  font-size: ${({ theme }) => theme.typography.sizes.headings.default};
  line-height: ${({ theme }) => theme.typography.lineHeight.headings.default};

  ${({ modSection, theme }) =>
    modSection &&
    css`
      font-size: ${theme.typography.sizes.headings.section};
      line-height: ${theme.typography.lineHeight.headings.section};
    `}

  ${({ modSubsection, theme }) =>
    modSubsection &&
    css`
      font-size: ${theme.typography.sizes.headings.subsection};
      font-weight: ${theme.typography.weights.bold};
      line-height: ${theme.typography.lineHeight.headings.subsection};
    `}
`;

export interface HeadingTagProps {
  /** Renders the Section variation */
  modSection?: boolean;
  /** Renders the Subsection variation */
  modSubsection?: boolean;
}

export default HeadingTag;
