import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

export interface CreateInput {
  src: string;
  alt: string;
  caption: string;
}

export class ImageBlot extends BlockEmbed {
  static blotName = 'figure';
  static tagName = 'figure';
  
  static create(value: CreateInput) {
    if (value instanceof HTMLElement) {
      return value;
    }

    let node: HTMLElement = super.create();

    const img = document.createElement('img');
    img.setAttribute('alt', value.alt);
    img.setAttribute('src', value.src);

    const caption = document.createElement('figcaption');
    caption.innerText = value.caption;

    node.appendChild(img);
    node.appendChild(caption);

    return node;
  }

  static value(node: HTMLElement) {
    return node;
  }
}
