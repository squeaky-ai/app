import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { uploadInvoice } from 'lib/users';
import type { UsersInvoiceSignImage } from 'types/graphql';

interface Props {
  invoice: File;
  onInvoiceSelect: (file: File) => void;
  onInvoiceRemove: VoidFunction;
}

const MUTATION = gql`
  mutation UsersInvoiceSignImage($input: UsersInvoiceSignImageInput!) {
    userInvoiceSignImage(input: $input) {
      url
      fields
    }
  }
`;

export const UploadInvoice: FC<Props> = ({ 
  invoice,
  onInvoiceSelect,
  onInvoiceRemove,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [createSignedLink] = useMutation<{ adminBlogSignImage: UsersInvoiceSignImage }>(MUTATION);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = event.target.files[0];

    await uploadInvoice(file, createSignedLink);

    setLoading(false);
    onInvoiceSelect(file);
  };

  return (
    <div className='input-group file'>
      <div>
        <Label className='file-upload'>
          <span className={classnames('button secondary', { disabled: loading })}>
          {loading
            ? <Spinner />
            : 'Choose File'}
          </span>
          <Input 
            id='invoice'
            type='file' 
            name='invoice' 
            accept='.doc,.docx,.pdf'
            onChange={onUpload}
          />
        </Label>
      </div>
      <div>
        {invoice && (
          <>
            <Icon name='file-line' /> 
            {invoice.name} 
            <Button type='button' className='tertiary link' onClick={onInvoiceRemove}>
              Remove
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
