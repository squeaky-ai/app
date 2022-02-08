import React from 'react';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'components/portal';
import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props {}

interface State {
  show: boolean;
  name: string;
}

export class PlanChanged extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = { 
      show: false,
      name: '',
    };
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('keyup', this.handleKeyUp, true);
  }

  public show = (name: string) => {
    this.setState({ name, show: true });
  };

  public hide = () => {
    this.setState({ show: false });
  };

  private handleClick = (event: MouseEvent) => {
    const element = event.target as Element;

    if (element.classList.contains('plan-changed')) {
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
          <div className='plan-changed'>
            <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
              <div className='plan-changed-body' role='dialog'>
                <Icon name='star-line' className='star' />

                <div className='content'>
                  <p><b>You&apos;re now on the {this.state.name} Plan!</b></p>
                  <p className='small'>You can change your plan at any time.</p>
                </div>

                <Button type='button' className='close' onClick={this.hide}>
                  <Icon name='close-line' />
                </Button>
              </div>
            </FocusTrap>
          </div>
        )}
      </Portal>
    );
  }
}
