import React from 'react';
import classnames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { Button } from 'components/button';
import { Portal } from 'components/portal';
import { Icon } from 'components/icon';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  button: string | React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  direction?: 'up' | 'down';
  portal?: boolean;
}

interface State {
  open: boolean;
}

export class Dropdown extends React.Component<Props, State> {
  private ref: React.RefObject<HTMLDivElement>;

  public constructor(props: Props) {
    super(props);

    this.state = { open: false };
    this.ref = React.createRef()
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyUp);

    return () => {
      document.removeEventListener('click', this.handleClick, true);
      document.removeEventListener('keyup', this.handleKeyUp, true);
    }
  }

  public close = () => {
    this.setState({ open: false });
  };

  private handleClick = (event: MouseEvent) => {
    const element = event.target as Element;
    const isModal = !!element.closest('.modal');

    if (this.ref.current && !this.ref.current.contains(element) && !isModal) {
      this.setState({ open: false });
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.setState({ open: false });
    }
  };

  private get coords() {
    if (!this.ref.current) { 
      return { top: 0, left: 0 };
    }
    const { x, y, height, width } = this.ref.current.getBoundingClientRect();

    const left = x + width;
    const top = y + height + 16;

    return { top, left };
  };

  public render(): JSX.Element {
    return (
      <div ref={this.ref} className={classnames('dropdown', this.props.className, { open: this.state.open })}>
        <Button onClick={() => this.setState({ open: !this.state.open })} className={this.props.buttonClassName}>
          {this.props.button}
          <Icon name='arrow-drop-down-line' className='arrow' />
        </Button>
  
        {this.props.portal
          ? (
            <Portal>
              {this.state.open && (
                <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                  <div className={classnames('dropdown-menu', this.props.direction, this.props.menuClassName)} style={this.coords}>
                    {this.props.children}
                  </div>
                </FocusTrap>
              )}
            </Portal>
          )
          : (
            <>
              {this.state.open && (
                <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                  <div className={classnames('dropdown-menu', this.props.direction, this.props.menuClassName)}>
                    {this.props.children}
                  </div>
                </FocusTrap>
              )}
            </>
          )
        }
      </div>
    );
  }
}
