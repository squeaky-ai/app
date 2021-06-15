import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface ContextProps {
  toasts: ToastItem[];
  add?: (value: ToastItem) => void;
}

export const ToastContext = React.createContext<ContextProps>({ toasts: [] });

const { Provider } = ToastContext;

type Dismiss = { remove: (id: string) => void };

interface State {
  toasts: ToastItem[];
}

interface ToastItem {
  id?: string;
  type: 'info' | 'success' | 'error';
  body: string;
}

const ToastContainer: FC = ({ children }) => (
  <div className='toast-container'>
    {children}
  </div>
);

const Toast: FC<ToastItem & Dismiss> = ({ id, type, body, remove }) => {
  React.useEffect(() => {
    setTimeout(() => { dismiss(); }, 2000);
  }, []);

  const dismiss = () => remove(id);

  return (
    <div className={classnames('toast', type)} onClick={dismiss}>
      <i className='ri-information-line' />
      <p>{body}</p>
    </div>
  );
};

export class ToastProvider extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);

    this.state = { toasts: [] }; 
  }

  public add = (input: ToastItem) => {
    const id = Math.random().toString(36).slice(-6);

    this.setState({
      toasts: [...this.state.toasts, { ...input, id }]
    });
  };

  public remove = (id: string) => {
    const toasts = this.state.toasts.filter(t => t.id !== id);
    this.setState({ toasts });
  };

  public render() {
    return (
      <Provider value={{ toasts: this.state.toasts, add: this.add }}>
        {this.props.children}

        <ToastContainer>
          {this.state.toasts.map(toast => (
            <Toast key={toast.body} {...toast} remove={this.remove} />
          ))}
        </ToastContainer>
      </Provider>
    );
  }
}