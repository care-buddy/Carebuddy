import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const EditorContainer = styled.div`
  height: 350px;
`;

const SelectOptions = [
  { value: 'group', label: '그룹을 선택해주세요' },
  { value: 'eyes', label: '눈 / 피부 / 귀' },
  { value: 'eyes', label: '눈 / 코 / 귀' },
];

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
  ],
};

const formats = [
  'bold', 'italic', 'underline', 'link', 'image'
];

interface PostCreateProps {
  onChange: (data: { title?: string, content?: string, groupId?: string }) => void;
}

const PostCreate: React.FC<PostCreateProps> = ({ onChange }) => {
  const [title, setTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    onChange({ title, content: editorContent, groupId: selectedValue });
  }, [title, editorContent, selectedValue, onChange]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log('선택된 값: ', event.target.value);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log('내용: ', content)
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Container>
      <SelectWrapper>
        <Select
          selectStyle="square"
          selectSize="bg"
          options={SelectOptions}
          value={selectedValue}
          onChange={handleSelectChange}
        />
      </SelectWrapper>
      <InputWrapper>
        <Input
          inputSize='bg'
          placeholder="제목을 입력해주세요."
          inputPadding='sm'
          value={title}
          onChange={handleTitleChange}
        />
      </InputWrapper>
      <EditorContainer>
        <ReactQuill
          placeholder='내용을 작성해주세요.'
          style={{ height: '300px' }}
          value={editorContent}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
        />
      </EditorContainer>
    </Container>
  );
};

export default PostCreate;
