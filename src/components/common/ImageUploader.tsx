import React from 'react';
import styled from 'styled-components';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';

import { LuCamera } from 'react-icons/lu';

interface ImageUploaderProps {
  imgView: string | File; // 화면에 보여줄 이미지
  selectFile: File | null; // 전송할 이미지
  onSelectFile: (value: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imgView,
  selectFile,
  onSelectFile,
}) => {
  // 이미지 핸들러(화면상에서 보여줌 + 전송할 파일 설정)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];

    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      onSelectFile(file);
    }
  };

  // const imageSrc = selectFile ? URL.createObjectURL(selectFile) : imgView;
  // 선택된 파일이 있으면 해당 파일의 URL을 생성하여 사용
  // 그렇지 않으면, imgView가 URL인지 확인하고 해당 URL을 사용
  // imgView가 File일 경우 URL.createObjectURL로 변환
  let imageSrc: string;
  if (selectFile) {
    imageSrc = URL.createObjectURL(selectFile);
  } else if (typeof imgView === 'string') {
    imageSrc = imgView;
  } else if (imgView) {
    imageSrc = URL.createObjectURL(imgView);
  } else {
    imageSrc = DefaultPetProfileImg; // 기본 이미지 URL
  }

  return (
    <>
      <Img
        // src={selectFile === undefined ? transferFile : selectFile}
        src={imageSrc}
        alt="프로필 이미지"
      />
      <LabelForFileInput>
        <LuCamera />
        <input
          type="file"
          id="postImage"
          name="postImage"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </LabelForFileInput>
    </>
  );
};

export default ImageUploader;

const Img = styled.img<{ src: string }>`
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

const LabelForFileInput = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  color: var(--color-green-main);
  padding: 8px 12px;
  border-radius: 5px;

  svg {
    width: 40px;
    height: 40px;
  }
`;
