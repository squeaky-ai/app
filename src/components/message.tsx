import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Preference, Preferences } from 'lib/preferences';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string | React.ReactNode;
}

export const Message: FC<Props> = ({ children, className, type, message, ...rest }) => (
  <div className={classnames('message', type, className)} {...rest}>
    <i className='ri-error-warning-line' />
    {message}
  </div>  
);

export const DismissableMessage: FC<Props & { preference: Preference, heading: string | React.ReactNode }> = ({ 
  preference, 
  children, 
  className, 
  type, 
  heading,
  message, 
  ...rest 
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleDismiss = () => {
    setShow(false);
    Preferences.setBoolean(preference, true);
  };

  React.useEffect(() => {
    if (!Preferences.getBoolean(preference)) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className={classnames('message dismissable', type, className)} {...rest}>
      <Button className='close' onClick={handleDismiss}>
        <i className='ri-close-line' />
      </Button>
      {heading}
      {message}
    </div>
  );
};
