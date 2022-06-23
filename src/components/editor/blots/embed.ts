import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

export interface CreateInput {
  html: string;
}

export class EmbedBlot extends BlockEmbed {
  static blotName = 'embed';
  static tagName = 'div';
  static className = 'embed'
  
  static create(value: CreateInput) {
    let node: HTMLElement = super.create();

    node.innerHTML = value.html || '';

    return node;
  }

  static value(node: HTMLElement) {
    return node;
  }
}
