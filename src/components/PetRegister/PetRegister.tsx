// 디바운싱 적용 필요

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import ImageUploader from '@components/common/ImageUploader';

import { Buddy } from '@/interfaces';

import DefaultPetProfileImg from '@assets/defaultPetProfile.png';

interface PetRegisterProps {
  petData: Buddy | null;
  onFormDataChange: (FormData: FormData) => void; // 폼데이터를 수집해 부모 컴포넌트로 전달하기 위한 콜백 함수
}

const PetRegister: React.FC<PetRegisterProps> = ({
  petData,
  onFormDataChange,
}) => {
  const [buddyImage, setBuddyImage] = useState<File | string | null>(null);
  // 전송할 이미지
  // 변경할 이미지를 고르고, 바로 변경되는 것이 아니기 때문에 저장할 상태가 필요
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // petInfo 객체 초기화
  const [petInfo, setPetInfo] = useState({
    sex: petData?.sex ?? (null as 1 | 2 | null), // 남: 1, 여: 2
    species: petData?.species ?? (null as 0 | 1 | null), // 강아지 0, 고양이 1
    isNeutered: petData?.isNeutered ?? (null as 'before' | 1 | null),
    // 없을 때 값은 임시
    name: petData?.name ?? '',
    kind: petData?.kind ?? '',
    age: petData?.age ?? '',
    weight: petData?.weight ?? '',
    // 없을 시 null로 수정해야함
    buddyImage: petData?.buddyImage,
  });

  // formData - input 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'name' | 'age' | 'weight' | 'kind'
  ) => {
    setPetInfo({
      ...petInfo,
      [type]: e.target.value,
    });
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
    // 수정 모달의 경우, 펫데이터가 있으므로 초기값 세팅
    if (petData) {
      setPetInfo({
        sex: petData.sex,
        species: petData.species,
        isNeutered: petData.isNeutered,
        name: petData?.name,
        kind: petData?.kind,
        age: petData?.age,
        weight: petData?.weight,
        buddyImage: petData?.buddyImage,
      });

      setBuddyImage(petData.buddyImage);
    }
  }, []);

  // 폼데이터 생성 함수
  const createFormData = () => {
    const formData = new FormData();
    // string으로 append 해줘야한다?
    formData.append('sex', String(petInfo.sex));
    formData.append('species', String(petInfo.species));
    formData.append('isNeutered', String(petInfo.isNeutered));
    formData.append('name', petInfo.name);
    formData.append('age', String(petInfo.age));
    formData.append('weight', String(petInfo.weight));
    formData.append('kind', petInfo.kind);
    // 선택 파일이 있을 때에는 그 파일을 append 해준다
    // 폼데이터에는 null 값을 보낼 수 없으니, 선택된 파일이나 버디이미지가 없는 경우에는 append하지 않습니다: 서버 default 값이 null
    if (selectedFile) {
      formData.append('buddyImage', selectedFile);

      // } else formData.append('buddyImage', buddyImage);
    } else if (buddyImage) {
      formData.append('buddyImage', buddyImage);
    }

    return formData;
  };

  // 모달 내용이 변경될 때마다 폼데이터를 객체를 만들어 업데이트해준다
  useEffect(() => {
    onFormDataChange(createFormData());
  }, [petInfo, selectedFile]);

  return (
    <Wrapper>
      <LeftSection>
        <Section>
          <Heading>프로필 등록</Heading>
          <ImageContainer>
            <ImageUploader
              imgView={buddyImage ?? DefaultPetProfileImg}
              selectFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          </ImageContainer>
        </Section>
      </LeftSection>

      <RightSection>
        <Section>
          <Heading>이름</Heading>
          <Input
            onChange={(e) => handleInputChange(e, 'name')}
            placeholder="이름을 입력해주세요"
            defaultValue={petData?.name || ''}
            inputPadding="sm"
            focusColor="green"
          />
        </Section>
        <Section>
          <Heading>성별</Heading>
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
            buttonStyle={
              petInfo.species === 0 ? 'square-green' : 'square-white'
            }
            buttonSize="sm"
            onClick={() => handleClick('species', 0)}
          >
            강아지
          </Button>
          <Button
            buttonStyle={
              petInfo.species === 1 ? 'square-green' : 'square-white'
            }
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
            inputPadding="sm"
            defaultValue={petData?.kind || ''}
            focusColor="green"
          />
        </Section>
        <Section>
          <Heading>나이</Heading>
          <Input
            type="number"
            onChange={(e) => handleInputChange(e, 'age')}
            placeholder="나이를 입력해주세요"
            inputPadding="sm"
            defaultValue={petData?.age || ''}
            focusColor="green"
          />
        </Section>
        <Section>
          <Heading>중성화</Heading>
          <Button
            buttonStyle={
              petInfo.isNeutered === 0 ? 'square-green' : 'square-white'
            }
            buttonSize="sm"
            onClick={() => handleClick('isNeutered', 0)}
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
            inputPadding="sm"
            defaultValue={petData?.weight || ''}
            focusColor="green"
          />
        </Section>
      </RightSection>
    </Wrapper>
  );
};

export default PetRegister;

const Wrapper = styled.div`
  display: flex;
`;

const LeftSection = styled.div``;
const RightSection = styled.div`
  margin-left: 5.5rem;
`;

const Section = styled.div`
  padding-bottom: 1rem;

  & > * {
    margin-right: 10px;
  }
`;

const Heading = styled.p`
  padding: 12px 0;
  font-size: var(--font-size-md-2);
  font-weight: var(--font-weight-bold);
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 170px;
  height: 160px;
`;
