// 게시글 작성 말고, 게시글 수정의 경우에는 카테고리 변경 불가능하도록 수정 !
// + 이미 카테고리가 있을 경우 받아오도록 수정

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

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

const ImageUploadWrapper = styled.div``;

const ImageUploadLabel = styled.label`
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

// 사용하지 않는 컴포넌트?
// const FileName = styled.span`
//   font-size: 14px;
// `;

interface PostCreateProps {
  postData: {
    title?: string;
    content?: string;
    communityId?: string;
    postImage: File | string | null;
  } | null;
  onFormDataChange: (FormData: FormData) => void;
}

const SpeciesOptions = [
  { value: '', label: '종을 선택해주세요' },
  { value: '0', label: '강아지' },
  { value: '1', label: '고양이' },
];

const SelectOptions = [
  { value: '', label: '그룹을 선택해주세요' },
  { value: '66b5ba8c19ffced581357307', label: '생식기·중성화·유선' },
  { value: '66c687429ac226b8a246a791', label: '생식기·중성화·유선' },
];

const PostCreate: React.FC<PostCreateProps> = ({
  postData,
  onFormDataChange,
}) => {
  const [imageFiles, setImageFiles] = useState<File | string | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [postInfo, setPostInfo] = useState({
    title: postData?.title ?? '',
    content: postData?.content ?? '',
    communityId: postData?.communityId ?? '',
    postImage: postData?.postImage,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostInfo({ ...postInfo, communityId: event.target.value });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostInfo({ ...postInfo, content: event.target.value });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostInfo({ ...postInfo, title: event.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    // 수정 모달의 경우, 펫데이터가 있으므로 초기값 세팅
    if (postData) {
      setPostInfo({
        title: postData.title ?? '',
        content: postData.content ?? '',
        communityId: postData.communityId ?? '',
        postImage: postData.postImage ?? '',
      });

      setImageFiles(postData.postImage);
    }
  }, []);

  // 폼데이터 생성 함수
  const createFormData = () => {
    const newFormData = new FormData();
    // string으로 append 해줘야한다?
    newFormData.append('title', String(postInfo.title));
    newFormData.append('content', String(postInfo.content));
    newFormData.append('communityId', String(postInfo.communityId));
    // 선택 파일이 있을 때에는 그 파일을 append 해준다
    // 폼데이터에는 null 값을 보낼 수 없으니, 선택된 파일이나 버디이미지가 없는 경우에는 append하지 않습니다: 서버 default 값이 null
    if (selectedImage) {
      newFormData.append('postImage', selectedImage);

      // } else formData.append('buddyImage', buddyImage);
    } else if (imageFiles) {
      newFormData.append('postImage', imageFiles);
    }

    return newFormData;
  };

  // 모달 내용이 변경될 때마다 폼데이터를 객체를 만들어 업데이트해준다
  useEffect(() => {
    onFormDataChange(createFormData());
  }, [postInfo, selectedImage]);

  // const imageSrc = selectFile ? URL.createObjectURL(selectFile) : imgView;
  // 선택된 파일이 있으면 해당 파일의 URL을 생성하여 사용
  // 그렇지 않으면, imgView가 URL인지 확인하고 해당 URL을 사용
  // imgView가 File일 경우 URL.createObjectURL로 변환
  let imageSrc: string | null;
  if (selectedImage) {
    imageSrc = URL.createObjectURL(selectedImage);
  } else if (typeof imageFiles === 'string') {
    imageSrc = imageFiles;
  } else if (imageFiles) {
    imageSrc = URL.createObjectURL(imageFiles);
  } else {
    imageSrc = null; // 기본 이미지 URL
  }

  return (
    <Container>
      <SelectWrapper>
        <Select selectStyle="square" selectSize="sm" options={SpeciesOptions} />
        <Select
          selectStyle="square"
          selectSize="bg"
          options={SelectOptions}
          value={postInfo?.communityId || ''}
          onChange={handleSelectChange}
        />
      </SelectWrapper>
      <InputWrapper>
        <Input
          inputSize="bg"
          placeholder="제목을 입력해주세요."
          inputPadding="sm"
          value={postInfo?.title || ''}
          onChange={handleTitleChange}
        />
      </InputWrapper>
      <TextAreaWrapper>
        <TextArea
          placeholder="내용을 입력해주세요."
          value={postInfo?.content || ''}
          onChange={handleContentChange}
          style={{ width: '100%', padding: '8px', height: '200px' }}
        />
      </TextAreaWrapper>
      <ImageUploadWrapper>
        <ImageUploadLabel htmlFor="postImage">사진 첨부</ImageUploadLabel>

        <input
          type="file"
          accept="image/png, image/jpeg"
          id="postImage"
          name="postImage"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <ImagePreview>
          {imageSrc ? <PreviewImage src={imageSrc} alt="이미지" /> : <div />}
        </ImagePreview>

        {/* {imageFiles.map((file) => (
          <ImagePreview key={file.name}>
            <PreviewImage src={URL.createObjectURL(file)} alt="미리보기" />
            <FileName>{file.name}</FileName>
          </ImagePreview>
        ))} */}
      </ImageUploadWrapper>
    </Container>
  );
};

export default PostCreate;
