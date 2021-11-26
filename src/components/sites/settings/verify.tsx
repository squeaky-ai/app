import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Message } from 'components/message';
import { verifySite } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Verify: FC<Props> = ({ site }) => {
  const toast = useToasts();
  const [failed, setFailed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const siteVerify = async () => {
    setLoading(true);

    const response = await verifySite({ siteId: site.id });

    if (!response.site?.verifiedAt) {
      setFailed(true);
      toast.add({ type: 'error', body: 'The tracking code could not be found' });
    } else {
      setFailed(false);
      toast.add({ type: 'success', body: 'Your tracking code is verified and active.' });
    }

    setLoading(false);
  };

  return (
    <>
      {failed && (
        <Message
          type='error'
          message={<span>We were unable to verify your installation. Please ensure you’ve correctly copied to code above into the <code className='code'>&lt;head&gt;</code> section of your HTML, and you’ve published the changes to a <b>publicly accessible page</b> (e.g. not behind a login) on the web.</span>}
        />
      )}

      <Button className='primary' onClick={siteVerify}>
        {loading 
          ? 'Verifying ...' 
          : site.verifiedAt ? 'Check Installation' : 'Verify Installation'
        }
      </Button>
    </>
  );
};
