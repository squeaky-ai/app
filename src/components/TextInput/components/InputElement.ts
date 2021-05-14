import styled from 'styled-components';

const InputElement = styled.input`
  max-width: 48rem;
  padding: 0.6rem 1rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.default.backgroundAlt};
  border: ${({ theme }) => theme.borders.defaultSize} solid
    ${({ theme }) => theme.colors.default.neutralFadedDark};
  border-radius: ${({ theme }) => theme.borders.radius};
  font-size: ${({ theme }) => theme.typography.sizes.default};
  line-height: ${({ theme }) => theme.typography.lineHeight.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.default.neutralMedium};
    font-style: italic;
  }

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.default.primary};
    outline: none;
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.default.background};
  }

  &:invalid,
  &[aria-invalid] {
    border-color: ${({ theme }) => theme.colors.default.warning};
  }
`;

export default InputElement;
