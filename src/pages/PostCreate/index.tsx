import React, { useState } from 'react';
import styled from 'styled-components';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';

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

const TextAreaWrapper = styled.div`
  margin-bottom: 15px;
`;

const ImageUploadWrapper = styled.div`
  margin-bottom: 15px;
`;

const ImageUploadButton = styled.button`
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
`;

interface PostCreateProps {
  formData: {
    title?: string;
    content?: string;
    groupId?: string;
    postImage: string[];
  };
  onFormDataChange: (data: { title?: string; content?: string; groupId?: string; postImage?: string[] }) => void;
}

const SelectOptions = [
  { value: '', label: '그룹을 선택해주세요' },
  { value: '6617c6acb39abf604bbe8dc8', label: '눈 / 피부 / 귀' },
  { value: '6617c6acb39abf604bbe8dc9', label: '눈 / 코 / 귀' },
  { value: '6617c6acb39abf604bbe8dc7', label: '위식도' },
];

const PostCreate: React.FC<PostCreateProps> = ({ formData, onFormDataChange }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFormDataChange({ ...formData, groupId: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormDataChange({ ...formData, content: event.target.value });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ ...formData, title: event.target.value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles(fileArray);

      const fileReaders = fileArray.map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then(base64Strings => {
        onFormDataChange({ ...formData, postImage: base64Strings });
      }).catch(error => console.error('파일 변환 오류:', error));
    }
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
      <TextAreaWrapper>
        <textarea
          placeholder="내용을 입력해주세요."
          value={formData.content}
          onChange={handleContentChange}
          rows={10}
          style={{ width: '100%', padding: '10px' }}
        />
      </TextAreaWrapper>
      <ImageUploadWrapper>
        <label>
          <ImageUploadButton onClick={() => document.getElementById('postImage')?.click()}>사진을 첨부하세요</ImageUploadButton>
          <input
            type="file"
            multiple
            accept="image/*"
            id='postImage'
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </label>
      </ImageUploadWrapper>
    </Container>
  );
};

export default PostCreate;
