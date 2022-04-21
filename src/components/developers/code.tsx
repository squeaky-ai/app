import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props {
  lang: string;
  children: React.ReactNode;
}

export const Code: FC<Props> = ({ lang, children }) => {
  const ref = React.useRef<HTMLElement>();
  const [copying, setCopying] = React.useState<boolean>(false);

  const copy = async () => {
    setCopying(true);

    if (ref.current) {
      const text = ref.current.innerText;
      await navigator.clipboard.writeText(text);
    }

    setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  return (
    <div className='code-wrapper'>
      <pre className='code block'>
        <code ref={ref} className={`language-${lang}`}>
          {children}
        </code>
      </pre>
      <Button className='link icon copy' onClick={copy}>
        <Icon name='file-copy-line' />
        {copying ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};
