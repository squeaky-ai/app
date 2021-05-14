import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from 'react';
import InputElement from './components/InputElement';

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { ...rest },
  ref,
) => <InputElement ref={ref} {...rest} />;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef(TextInput);
