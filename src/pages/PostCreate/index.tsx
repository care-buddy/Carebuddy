import React from 'react';
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
  { value: '', label: '그룹을 선택해주세요' },
  { value: '6617c6acb39abf604bbe8dc8', label: '눈 / 피부 / 귀' },
  { value: '6617c6acb39abf604bbe8dc9', label: '눈 / 코 / 귀' },
  { value: '6617c6acb39abf604bbe8dc7', label: '위식도' },
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
  formData: { title?: string, content?: string, groupId?: string };
  onFormDataChange: (data: { title?: string, content?: string, groupId?: string }) => void;
}

const PostCreate: React.FC<PostCreateProps> = ({ formData, onFormDataChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFormDataChange({ ...formData, groupId: event.target.value });
  };

  const handleEditorChange = (content: string) => {
    onFormDataChange({ ...formData, content });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ ...formData, title: event.target.value });
  };

  return (
    <Container>
      <SelectWrapper>
        <Select
          selectStyle="square"
          selectSize="bg"
          options={SelectOptions}
          value={formData.groupId}
          onChange={handleSelectChange}
        />
      </SelectWrapper>
      <InputWrapper>
        <Input
          inputSize='bg'
          placeholder="제목을 입력해주세요."
          inputPadding='sm'
          value={formData.title}
          onChange={handleTitleChange}
        />
      </InputWrapper>
      <EditorContainer>
        <ReactQuill
          placeholder='내용을 작성해주세요.'
          style={{ height: '300px' }}
          value={formData.content}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
        />
      </EditorContainer>
    </Container>
  );
};

export default PostCreate;
