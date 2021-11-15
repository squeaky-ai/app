import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';

interface Props {
  lang: string;
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
        <i className='ri-file-copy-line' />
        {copying ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};
