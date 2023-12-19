import React from 'react';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'components/portal';
import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props {}

interface State {
  show: boolean;
}

export class FreeTrialModal extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = { 
      show: false,
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

  public show = () => {
    this.setState({ show: true });
  };

  public hide = () => {
    this.setState({ show: false });
  };

  private handleClick = (event: MouseEvent) => {
    const element = event.target as Element;

    if (element.classList.contains('free-trial-modal')) {
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
          <div className='free-trial-modal'>
            <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
              <div className='free-trial-body' role='dialog'>
                <div className='content'>
                  <h3>
                    <Icon name='star-line' className='star' />
                    Great news!
                  </h3>
                  <h4>We&apos;re providing you with a <b>14-day</b> free trial of our most advanced features, and you can capture up to 5000 visits to your website during the trial.</h4>
                  <p>This is your chance to experience the full power of Squeaky&apos;s analytics suite, and when your trial ends you&apos;ll simply revert back to the free plan. If you&apos;re excited about maintaining access to the paid features you can upgrade at any time!</p>
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
