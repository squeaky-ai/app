import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Button } from 'components/button';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const TrackingCode: FC<Props> = ({ site }) => {
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
    <>
      <Label>
        Tracking code
        <Button className='link icon' onClick={copy}>
          <Icon name='file-copy-line' />
          {copying ? 'Copied!' : 'Copy to clipboard'}
        </Button>
      </Label>
      <pre className='code block simple'>
        <code ref={ref}>
{`<!-- Squeaky Tracking Code for ${site.url} -->
<script>
  (function(s,q,u,e,a,k,y){
    s._sqSettings={site_id:'${site.uuid}'};
    e=q.getElementsByTagName('head')[0];
    a=q.createElement('script');
    a.src=u+s._sqSettings.site_id;
    e.appendChild(a);
  })(window,document,'https://cdn.squeaky.ai/g/1.1.0/script.js?');
</script>`}
        </code>
      </pre>
    </>
  );
};