import InputLabel, { InputLabelProps } from 'components/InputLabel/InputLabel';
import { useUniqueId } from 'components/UniqueId';
import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import InputElement from './components/InputElement';

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { id, labelText, modHideLabel, ...rest },
  ref,
) => {
  const inputId = useUniqueId('', id);

  return (
    <>
      <InputLabel htmlFor={inputId} modHideLabel={modHideLabel} modSpaceAfter>
        {labelText}
      </InputLabel>
      <InputElement id={inputId} ref={ref} {...rest} />
    </>
  );
};

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Pick<InputLabelProps, 'modHideLabel'> {
  /** Content of the label */
  labelText: ReactNode;
}

export default forwardRef(TextInput);
