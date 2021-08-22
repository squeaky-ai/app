import React from 'react';
import FocusTrap from 'focus-trap-react';
import classnames from 'classnames';
import { Portal } from 'components/portal';
import type { FC } from 'react';

interface Props {
  className?: string;
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

export const ModalBody: FC = ({ children, ...rest }) => (
  <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
    <div className='modal-body' role='dialog' {...rest}>
      {children}
    </div>
  </FocusTrap>
);

export const ModalHeader: FC = ({ children, ...rest }) => (
  <div className='modal-header' {...rest}>
    {children}
  </div>
);

export const ModalContents: FC = ({ children, ...rest }) => (
  <div className='modal-contents' {...rest}>
    {children}
  </div>
);

export const ModalFooter: FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div className={classnames('modal-footer', className)} {...rest}>
    {children}
  </div>
);
