import React from 'react';
import type { FC } from 'react';
import RichTextEditor from 'react-rte';
import { UploadImage } from 'components/admin/upload-image';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { EditorValue } from 'react-rte';

export interface Props {
  value: string;
  onChange: (value: string) => void;
  refetchImages: VoidFunction;
}

type GetControlState = (key: string) => string | undefined;

type SetControlState = (key: string, value: string) => void;

export const RichText: FC<Props> = ({ value, onChange, refetchImages }) => {
  const [state, setState] = React.useState<EditorValue>(
    RichTextEditor.createValueFromString(value || '', 'html')
  );

  const ImageUpload = (_set: SetControlState, _get: GetControlState, state: EditorState) => {
    const onImageUploaded = (src: string) => {
      const contentState = state.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(state, { currentContent: contentStateWithEntity });

      const updatedState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
      setState(EditorValue.createFromState(updatedState));
    };
  
    return (
      <UploadImage
        key='upload-image'
        refetchImages={refetchImages} 
        onImageUpload={name => onImageUploaded(`https://cdn.squeaky.ai/blog/${name}`)}
      />
    );
  };

  const handleChange = (value: EditorValue) => {
    setState(value);
    onChange(value.toString('html'));
  };

  return (
    <RichTextEditor
      value={state}
      onChange={handleChange}
      className='rich-text-wrapper'
      editorClassName='rich-text-editor'
      toolbarClassName='rich-text-toolbar'
      customControls={[ImageUpload]}
    />
  );
};