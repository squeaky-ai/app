import InputLabel, { InputLabelProps } from 'components/InputLabel/InputLabel';
import Text from 'components/Text';
import { useUniqueId } from 'components/UniqueId';
import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import InputContainer, { InputContainerProps } from './components/InputContainer';
import InputElement from './components/InputElement';

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { error, id, labelText, modHideLabel, modSpaceAfter, ...rest },
  ref,
) => {
  const inputId = useUniqueId('', id);
  const errorState = !!error;

  return (
    <InputContainer modSpaceAfter={modSpaceAfter}>
      <InputLabel htmlFor={inputId} modHideLabel={modHideLabel} modSpaceAfter>
        {labelText}
      </InputLabel>
      <InputElement
        aria-describedby={`error${inputId}`}
        aria-invalid={errorState || undefined}
        id={inputId}
        ref={ref}
        {...rest}
      />
      {errorState && (
        <Text id={`error${inputId}`} modSmall modSmallSpaceBefore modWarning>
          {error}
        </Text>
      )}
    </InputContainer>
  );
};

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Pick<InputLabelProps, 'modHideLabel'>,
    Pick<InputContainerProps, 'modSpaceAfter'> {
  /** Content of the label */
  labelText: ReactNode;
  /** Error message to render when invalid */
  error?: ReactNode;
}

export default forwardRef(TextInput);
