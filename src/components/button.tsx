import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ children, className, ...rest }) => (
  <button className={classnames('button', className)} {...rest}>
    {children}
  </button>
);

export const DelayedButton: FC<Props & { delay: number }> = ({ children, onClick, ...rest }) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      disabled && setDisabled(false);
    }, 10000);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisabled(true);
    onClick(event);
  };

  return (
    <Button disabled={disabled} onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};
