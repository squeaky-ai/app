import React from 'react';
import type { FC } from 'react';
import FocusTrap from 'focus-trap-react';
import classnames from 'classnames';
import { Portal } from 'components/portal';

interface Props {
  className?: string;
  children: React.ReactNode;
  // It may seem weird at first as the component usually closes this
  // via the ref, but the modal can also be closed via the eventListeners
  // so the hook is there to cover all cases
  onClose?: VoidFunction;
}

interface State {
  show: boolean;
}

export class Modal extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = { show: false };
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('keyup', this.handleKeyUp, true);
  }

  public show = () => {
    this.setState({ show: true });
  };

  public hide = () => {
    this.setState({ show: false });
    this.props.onClose && this.props.onClose();
  };

  private handleClick = (event: MouseEvent) => {
    const element = event.target as Element;

    if (element.classList.contains('modal')) {
      this.hide();
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.hide();
    }
  };

  public render() {
    return (
      <Portal>
        {this.state.show && (
          <div className={classnames('modal', this.props.className)}>
            {this.props.children}
          </div>
        )}
      </Portal>
    );
  }
}

export const ModalBody: FC<{ children: React.ReactNode }> = ({ children, ...rest }) => (
  <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
    <div className='modal-body' role='dialog' {...rest}>
      {children}
    </div>
  </FocusTrap>
);

export const ModalHeader: FC<{ children: React.ReactNode }> = ({ children, ...rest }) => (
  <div className='modal-header' {...rest}>
    {children}
  </div>
);

export const ModalContents: FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div className={classnames('modal-contents', className)} {...rest}>
    {children}
  </div>
);

export const ModalFooter: FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div className={classnames('modal-footer', className)} {...rest}>
    {children}
  </div>
);
