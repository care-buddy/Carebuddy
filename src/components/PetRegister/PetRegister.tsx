// 추후 이미지 업로드 + 로직 공통컴포넌트화
// 디바운싱 적용 필요

import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import { LuCamera } from 'react-icons/lu';

// 임시 데이터
import { tempProfileSrc } from '@constants/tempData';

// 인터페이스
// import { FormData } from '@/pages/Temp-PetRegister';

// interface PetRegisterProps {
// formData: FormData;
// setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// }

const PetRegister = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 프리뷰 이미지
  const [, setSelectedFile] = useState<File | null>(null); // 전송할 이미지
  // const [selectedFile, setSelectedFile] = useState<File | null>(null); // 전송할 이미지

  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  // petInfo 객체 초기화
  const [petInfo, setPetInfo] = useState({
    gender: null as 'male' | 'female' | null,
    species: null as 'dog' | 'cat' | null,
    neutered: null as 'before' | 'completed' | null,
  });

  // 이미지 핸들러(화면상에서 보여줌 + 전송할 파일 설정)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file); // 프리뷰 url
      setPreviewUrl(imageUrl);
    }
  };

  // formData - button 핸들러
  const handleClick = (
    type: 'gender' | 'species' | 'neutered',
    value: 'male' | 'female' | 'dog' | 'cat' | 'before' | 'completed'
  ) => {
    setPetInfo({
      ...petInfo,
      [type]: value,
    });
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [type]: value,
    // }));
  };

  // formData - input 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // 임시
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: 'name' | 'age' | 'weight'
  ) => {
    // 임시
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value } = e.target;

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [type]: type === 'age' || type === 'weight' ? parseInt(value, 10) : value,
    // }));
  };

  // 이미지 전송 핸들러
  // const handleProfileImageSubmit = () => {};

  return (
    <>
      <Section>
        <Heading>프로필 등록</Heading>
        <ImageContainer>
          <Img src={previewUrl || tempProfileSrc} alt="프로필 이미지" />
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
        </ImageContainer>
      </Section>
      <Section>
        <Heading>반려동물 이름</Heading>
        <Input onChange={(e) => handleInputChange(e, 'name')} />
      </Section>
      <Section>
        <Heading>반려동물 성별</Heading>
        <Button
          buttonStyle={
            petInfo.gender === 'male' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('gender', 'male')}
        >
          남자 아이
        </Button>
        <Button
          buttonStyle={
            petInfo.gender === 'female' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('gender', 'female')}
        >
          여자 아이
        </Button>
      </Section>
      <Section>
        <Heading>반려동물 종</Heading>
        <Button
          buttonStyle={
            petInfo.species === 'dog' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('species', 'dog')}
        >
          강아지
        </Button>
        <Button
          buttonStyle={
            petInfo.species === 'cat' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('species', 'cat')}
        >
          고양이
        </Button>
      </Section>
      <Section>
        <Heading>반려동물 나이</Heading>
        <Input type="number" onChange={(e) => handleInputChange(e, 'age')} />
      </Section>
      <Section>
        <Heading>중성화 여부</Heading>
        <Button
          buttonStyle={
            petInfo.neutered === 'before' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('neutered', 'before')}
        >
          중성화 전
        </Button>
        <Button
          buttonStyle={
            petInfo.neutered === 'completed' ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('neutered', 'completed')}
        >
          중성화 완료
        </Button>
      </Section>

      <Section>
        <Heading>반려동물 체중</Heading>
        <Input type="number" onChange={(e) => handleInputChange(e, 'weight')} />
      </Section>
    </>
  );
};

export default PetRegister;

const Section = styled.div`
  padding-bottom: 20px;

  & > * {
    margin-right: 10px;
  }
`;

const Heading = styled.p`
  padding: 10px 0;
  font-size: var(--font-size-hd-1);
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 170px;
  height: 160px;
`;

const Img = styled.img<{ src?: string }>`
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
