import React from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';

export class Modal extends React.Component {
  private element: HTMLDivElement;

  public constructor(props: {}) {
    super(props);
  }

  public componentDidMount() {
    this.element = document.createElement('div');
    this.element.classList.add('modal');
    document.addEventListener('click', this.handleClick);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  public show = () => {
    this.root.appendChild(this.element);
  };

  public hide = () => {
    this.root.removeChild(this.element);
  };

  private handleClick = (event: MouseEvent) => {
    const element = event.target as Element;

    if (element.classList.contains('modal')) {
      this.hide();
    }
  };

  private get root() {
    return document.getElementById('modal-root');
  }

  public render() {
    if (typeof window === 'undefined' || !this.element) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export const ModalBody: FC = ({ children }) => (
  <div className='modal-body'>
    {children}
  </div>
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
