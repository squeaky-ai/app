import InputLabel, { InputLabelProps } from 'components/InputLabel/InputLabel';
import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import InputElement from './components/InputElement';

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { labelText, modHideLabel, ...rest },
  ref,
) => (
  <>
    <InputLabel modHideLabel={modHideLabel} modSpaceAfter>
      {labelText}
    </InputLabel>
    <InputElement ref={ref} {...rest} />
  </>
);

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Pick<InputLabelProps, 'modHideLabel'> {
  /** Content of the label */
  labelText: ReactNode;
}

export default forwardRef(TextInput);
