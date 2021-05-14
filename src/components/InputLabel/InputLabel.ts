import styled from 'styled-components';
import { cssVisuallyHidden } from 'utilities/accessibility';

const InputLabel = styled.label<InputLabelProps>`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.sizes.default};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.default};

  ${({ modSpaceAfter, theme }) =>
    modSpaceAfter && `margin-block-end: ${theme.stack.spacing.small};`}

  ${({ modHideLabel }) => modHideLabel && cssVisuallyHidden}
`;

export interface InputLabelProps {
  /** Renders the label only for assistive technologies */
  modHideLabel?: boolean;
  /** Adds a default spacing after the label */
  modSpaceAfter?: boolean;
}

export default InputLabel;
