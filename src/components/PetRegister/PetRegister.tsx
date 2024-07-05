// 추후 이미지 업로드 + 로직 공통컴포넌트화
// 디바운싱 적용 필요

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import { LuCamera } from 'react-icons/lu';

// 임시 데이터
import { tempProfileSrc } from '@constants/tempData';
import { Buddy } from '@/interfaces';

interface PetRegisterProps {
  petData: Buddy | null;
}

const PetRegister: React.FC<PetRegisterProps> = ({ petData }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 프리뷰 이미지
  const [, setSelectedFile] = useState<File | null>(null); // 전송할 이미지

  // petInfo 객체 초기화
  const [petInfo, setPetInfo] = useState({
    sex: petData?.sex ?? (null as 1 | 2 | null), // 남: 1, 여: 2
    species: petData?.species ?? (null as 0 | 1 | null), // 강아지 0, 고양이 1
    isNeutered: petData?.isNeutered ?? (null as 'before' | 1 | null),
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

  // formData - button 핸들러: 성별, 종, 중성화 여부가 버튼으로 관리
  const handleClick = (
    type: 'sex' | 'species' | 'isNeutered',
    value: 0 | 1 | 2 | null
  ) => {
    setPetInfo({
      ...petInfo,
      [type]: value,
    });
  };

  useEffect(() => {
    if (petData) {
      setPetInfo({
        sex: petData.sex,
        species: petData.species,
        isNeutered: petData.isNeutered,
      });
    }
  }, [petData]);

  // formData - input 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'name' | 'age' | 'weight' | 'kind'
  ) => {
    console.log(e, type);
  };

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
        <Input
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="이름을 입력해주세요"
          placeholderColor="light-grey"
          defaultValue={petData?.name || ''}
        />
      </Section>
      <Section>
        <Heading>반려동물 성별</Heading>
        <Button
          buttonStyle={petInfo?.sex === 1 ? 'square-green' : 'square-white'}
          buttonSize="sm"
          onClick={() => handleClick('sex', 1)}
        >
          남자 아이
        </Button>
        <Button
          buttonStyle={petInfo?.sex === 2 ? 'square-green' : 'square-white'}
          buttonSize="sm"
          onClick={() => handleClick('sex', 2)}
        >
          여자 아이
        </Button>
      </Section>
      <Section>
        <Heading>반려동물 종</Heading>
        <Button
          buttonStyle={petInfo.species === 0 ? 'square-green' : 'square-white'}
          buttonSize="sm"
          onClick={() => handleClick('species', 0)}
        >
          강아지
        </Button>
        <Button
          buttonStyle={petInfo.species === 1 ? 'square-green' : 'square-white'}
          buttonSize="sm"
          onClick={() => handleClick('species', 1)}
        >
          고양이
        </Button>
      </Section>
      <Section>
        <Heading>품종</Heading>
        <Input
          onChange={(e) => handleInputChange(e, 'kind')}
          placeholder="품종을 입력해주세요"
          placeholderColor="light-grey"
          defaultValue={petData?.kind || ''}
        />
      </Section>
      <Section>
        <Heading>반려동물 나이</Heading>
        <Input
          type="number"
          onChange={(e) => handleInputChange(e, 'age')}
          placeholder="나이를 입력해주세요"
          placeholderColor="light-grey"
          defaultValue={petData?.age || 0}
        />
      </Section>
      <Section>
        <Heading>중성화 여부</Heading>
        <Button
          buttonStyle={
            petInfo.isNeutered === null ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('isNeutered', null)}
        >
          중성화 전
        </Button>
        <Button
          buttonStyle={
            petInfo.isNeutered === 1 ? 'square-green' : 'square-white'
          }
          buttonSize="sm"
          onClick={() => handleClick('isNeutered', 1)}
        >
          중성화 완료
        </Button>
      </Section>

      <Section>
        <Heading>반려동물 체중</Heading>
        <Input
          type="number"
          onChange={(e) => handleInputChange(e, 'weight')}
          placeholder="체중을 입력해주세요"
          placeholderColor="light-grey"
          defaultValue={petData?.weight || 0}
        />
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

  input {
    padding: 8px 6px;
  }
`;

const Heading = styled.p`
  padding: 12px 0;
  font-size: var(--font-size-md-2);
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
