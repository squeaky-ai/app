import React from 'react';
import { Error } from 'components/error';
import { Button } from 'components/button';

interface State {
  hasError: boolean;
}

export class ErrorBoundary<P> extends React.Component<P, State> {
  public constructor(props: P) {
    super(props);

    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error({ error, errorInfo });
  }

  public render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className='error-boundary'>
        <Error 
          title='Client Side Error'
          action={(
            <Button className='primary' onClick={() => location.reload()}>
              Try Again
            </Button>
          )}
        />
      </div>
    );
  }
}
