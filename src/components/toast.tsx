import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface ContextProps {
  toasts: ToastItem[];
  add?: (value: ToastItem) => void;
}

export const ToastContext = React.createContext<ContextProps>({ toasts: [] });

const { Provider } = ToastContext;

type Dismiss = { remove: (id: string) => void };

interface Props {
  children: React.ReactNode;
}

interface State {
  toasts: ToastItem[];
}

export interface ToastItem {
  id?: string;
  type: 'info' | 'success' | 'error';
  body: string;
}

const ToastContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
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
      <Icon name='information-line' />
      <p>{body}</p>
    </div>
  );
};

export class ToastProvider extends React.Component<Props, State> {
  public constructor(props: Props) {
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
            <Toast key={toast.id} {...toast} remove={this.remove} />
          ))}
        </ToastContainer>
      </Provider>
    );
  }
}