import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { uploadFile } from 'lib/admin/blog';

interface Props {
  refetchImages: VoidFunction;
  createSignedLink: Function;
}

export const UploadImage: FC<Props> = ({ refetchImages, createSignedLink }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    await uploadFile(event.target.files[0], createSignedLink);

    refetchImages();
    setLoading(false);
  };

  return (
    <Label className='button image-container quaternary upload'>
      <Input type='file' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={onUpload} />

      {loading
        ? <Spinner />
        : <Icon name='upload-cloud-2-line' />
      }
    </Label>
  );
};
