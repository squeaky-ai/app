import styled, { css } from 'styled-components';

const HeadingTag = styled.h1<HeadingTagProps>`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.default.neutralDark};
  font-family: ${({ theme }) => theme.typography.stack};
  font-weight: ${({ theme }) => theme.typography.weights.heavy};
  font-size: ${({ theme }) => theme.typography.sizes.headings.default};
  line-height: ${({ theme }) => theme.typography.lineHeight.headings.default};

  ${({ modFormHeading, theme }) =>
    modFormHeading &&
    css`
      font-size: ${theme.typography.sizes.headings.form};
      font-weight: ${theme.typography.weights.semibold};
      line-height: ${theme.typography.lineHeight.headings.form};
    `}

  ${({ modSection, theme }) =>
    modSection &&
    css`
      font-size: ${theme.typography.sizes.headings.section};
      line-height: ${theme.typography.lineHeight.headings.section};
    `}

  ${({ modSpace, modSpaceAfter, theme }) =>
    (modSpace || modSpaceAfter) &&
    css`
      margin-block-end: ${theme.stack.spacing.default};
    `}

  ${({ modSpaceLarge, modSpaceAfterLarge, theme }) =>
    (modSpaceLarge || modSpaceAfterLarge) &&
    css`
      margin-block-end: ${theme.stack.spacing.large};
    `}

  ${({ modSpace, modSpaceBefore, theme }) =>
    (modSpace || modSpaceBefore) &&
    css`
      margin-block-start: ${theme.stack.spacing.default};
    `}

  ${({ modSpaceLarge, modSpaceBeforeLarge, theme }) =>
    (modSpaceLarge || modSpaceBeforeLarge) &&
    css`
      margin-block-start: ${theme.stack.spacing.large};
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
  /** Renders the heading variation for form sections */
  modFormHeading?: boolean;
  /** Renders the Section variation */
  modSection?: boolean;
  /** Renders a space before and after the component */
  modSpace?: boolean;
  /** Renders a space before and after the component */
  modSpaceLarge?: boolean;
  /** Renders some space after the component */
  modSpaceAfter?: boolean;
  /** Renders some large space after the component */
  modSpaceAfterLarge?: boolean;
  /** Renders some space before the component */
  modSpaceBefore?: boolean;
  /** Renders some large space before the component */
  modSpaceBeforeLarge?: boolean;
  /** Renders the Subsection variation */
  modSubsection?: boolean;
}

export default HeadingTag;
