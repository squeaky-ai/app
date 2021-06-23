import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import type { FC } from 'react';

interface State {
  show: boolean;
}

export const Portal: FC = ({ children }) => {
  const selector = '#modal-root';

  const ref = React.useRef<HTMLElement>();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? ReactDOM.createPortal(children, ref.current) : null
};

export class Modal extends React.Component<{}, State> {
  public constructor(props: {}) {
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
          <div className='modal'>
            {this.props.children}
          </div>
        )}
      </Portal>
    );
  }
}

export const ModalBody: FC = ({ children }) => (
  <FocusTrap>
    <div className='modal-body'>
      {children}
    </div>
  </FocusTrap>
);

export const ModalHeader: FC = ({ children }) => (
  <div className='modal-header'>
    {children}
  </div>
);

export const ModalContents: FC = ({ children }) => (
  <div className='modal-contents'>
    {children}
  </div>
);

export const ModalFooter: FC = ({ children }) => (
  <div className='modal-footer'>
    {children}
  </div>
);
