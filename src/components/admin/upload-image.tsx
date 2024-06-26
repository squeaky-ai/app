import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { uploadFile } from 'lib/admin/common';
import type { AdminBlogSignImage } from 'types/graphql';

interface Props {
  refetchImages: VoidFunction;
  onImageUpload?: (file: string) => void;
}

const MUTATION = gql`
  mutation AdminBlogSignImage($input: AdminBlogSignImageInput!) {
    adminBlogSignImage(input: $input) {
      url
      fields
    }
  }
`;

export const UploadImage: FC<Props> = ({ refetchImages, onImageUpload }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [createSignedLink] = useMutation<{ adminBlogSignImage: AdminBlogSignImage }>(MUTATION);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = event.target.files[0];

    await uploadFile(file, createSignedLink);

    refetchImages();
    setLoading(false);

    if (onImageUpload) onImageUpload(file.name);
  };

  return (
    <Label className={classnames('button upload-image', { loading })}>
      <Input type='file' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={onUpload} />
      {loading ? 'Uploading...' : '+ Add New'}
    </Label>
  );
};
