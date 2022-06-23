import React from 'react';
import Quill from 'quill';
import { Toolbar } from 'components/editor/toolbar';
import { ImageBlot } from 'components/editor/blots/figure';
import { EmbedBlot } from 'components/editor/blots/embed';
import type { QuillOptionsStatic } from 'quill';

export interface Props {
  value: string;
  images: string[];
  onChange: (value: string) => void;
  refetchImages: VoidFunction;
}

export class Editor extends React.Component<Props> {
  private editor: Quill;
  private container: React.RefObject<HTMLDivElement>;
  private initialValue: string;

  public constructor(props: Props) {
    super(props);

    this.container = React.createRef<HTMLDivElement>();
    this.initialValue = this.props.value;
  }

  public componentDidMount(): void {
    const options: QuillOptionsStatic = {
      modules: {
        toolbar: '#toolbar',
      }
    };

    Quill.debug('error');
    Quill.register(ImageBlot);
    Quill.register(EmbedBlot);

    this.editor = new Quill(this.container.current, options);

    this.editor.on('text-change', this.handleTextChange);
    this.forceUpdate();
  }

  public componentWillUnmount(): void {
    this.editor = null;
  }

  private handleTextChange = () => {
    const html = this.editor.root.innerHTML;
    this.props.onChange(html);
  };

  public render(): JSX.Element {
    return (
      <>
        <Toolbar
          editor={this.editor} 
          images={this.props.images}
          refetchImages={this.props.refetchImages}
        />
        <div id='editor' ref={this.container} dangerouslySetInnerHTML={{ __html: this.initialValue }} />
      </>
    );
  }
}
