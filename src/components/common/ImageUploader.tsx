import React from 'react';
import styled from 'styled-components';

import { LuCamera } from 'react-icons/lu';

interface ImageUploaderProps {
  transferFile: string; // 전송할 이미지
  selectFile: string | undefined; // 화면에 보여줄 이미지
  onSelectFile: (value: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  transferFile,
  selectFile,
  onSelectFile,
}) => {
  // 이미지 핸들러(화면상에서 보여줌 + 전송할 파일 설정)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onSelectFile(imageUrl);
    }
  };

  return (
    <>
      <Img
        src={selectFile === undefined ? transferFile : selectFile}
        alt="프로필 이미지"
      />
      <LabelForFileInput>
        <LuCamera />
        <input
          type="file"
          id="profile"
          name="profile"
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
