import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Virtual } from 'swiper/modules';
import { LuPlus } from 'react-icons/lu';
import Modal from '@/components/common/Modal';
import PetRegister from '@/components/PetRegister/PetRegister';
import { Buddy } from '@/interfaces';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { tempProfileSrc } from '@constants/tempData';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';
import { CardsWrapper, Cards } from './card-components';
import PetCard from './PetCard';

const ProfilesTitle = styled.div`
  font-size: var(--font-size-hd-2);
  font-weight: var(--font-weight-bold);
  margin: 20px 0 30px 0;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding: 4px 10px;
  > div {
    padding-top: 8px;
  }
  > div:last-child {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
  }
`;

const AddProfile = styled.div`
  width: 100px;
  height: 100px;
  background: var(--color-grey-3);
  border-radius: 50%;
  border: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: #b3b3b3;
    width: 50px;
    height: 50px;
  }
`;

const AddProfileMsg = styled.p`
  margin-top: 26px;
  font-size: 18px;
  text-align: center;
  color: #7d7d7d;
`;

const dummyBuddy1: Buddy = {
  _id: '1a',
  name: '후이',
  species: 0,
  kind: '말티즈',
  sex: 2,
  age: 3,
  buddyImage: tempProfileSrc,
  isNeutered: 1,
  weight: 3,
  createdAt: '2024-04-19T09:00:00.463Z',
  updatedAt: '2024-04-19T09:00:00.463Z',
  deletedAt: null,
};

const dummyBuddy2: Buddy = {
  _id: '2b',
  name: '쿠키',
  species: 1,
  kind: '샴',
  sex: 1,
  age: 2,
  buddyImage: DefaultPetProfileImg,
  isNeutered: null,
  weight: 6,
  createdAt: '2024-04-19T09:00:00.463Z',
  updatedAt: '2024-04-19T09:00:00.463Z',
  deletedAt: null,
};

interface ProfilesWrapperProps {
  name?: string;
  buddies?: BuddyProfile[];
  onSubmitBuddy: (newBuddy: BuddyProfile) => void;
}

// 공통 인터페이스 통합하기
interface BuddyProfile {
  _id: string;
  name: string;
  kind: string;
  age: number;
  buddyImage: string;
}

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

// 회원 이름과 버디 정보들을 받아와서 카드에 렌더링해준다.
const PetProfiles: React.FC<ProfilesWrapperProps> = ({
  name,
  buddies,
  onSubmitBuddy,
}) => {
  const mock = new MockAdapter(axiosInstance);

  const [petModalOpen, setPetModalOpen] = useState(false);
  const [petEditModalOpen, setPetEditModalOpen] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null); // 선택된 반려동물
  const [formData, setFormData] = useState<FormData | null>(null); // 수정/등록을 위한 폼데이터 상태

  const [profiles, setProfiles] = useState<BuddyProfile[]>(buddies || []); // 반려동물 전체 프로필 상태: 등록 및 수정을 위함

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleOpenPetModal = () => {
    setPetModalOpen(true);
  };

  // mock.onGet('/api/buddies/1a').reply(200, dummyBuddy1);
  // mock.onGet('/api/buddies/2b').reply(200, dummyBuddy2);

  const handleOpenPetEditModal = async (buddyId: string) => {
    try {
      setLoading(true);
      setPetEditModalOpen(true);

      // 모킹 설정
      mock.onGet('/buddies/1a').reply(200, dummyBuddy1);
      mock.onGet('/buddies/2b').reply(200, dummyBuddy2);

      const response = await axiosInstance.get(`/buddies/${buddyId}`);
      setSelectedBuddy(response.data); // 가져온 반려동물 정보 설정, 수정(PUT) 요청 시 여기서 id를 가져올 수 있다
      setLoading(false);
    } catch (error) {
      setError(error);
      alert(
        '불러오는 데 오류 발생 다시 시도해주세요 오류메시지를 다시 설정해주세요'
      );
      setError(null);
      setLoading(false);
      setPetEditModalOpen(false);
    }
  };

  const handleClosePetModal = () => {
    setPetModalOpen(false);
  };

  const handleClosePetEditModal = () => {
    setPetEditModalOpen(false);
    setSelectedBuddy(null); // 모달 창이 닫힐 때 선택된 반려동물 정보 초기화
  };

  // 폼데이터가 변화할때마다 상태 업데이트
  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  // 로딩처리 필요
  const handleFormSubmit = async () => {
    // 가짜 POST 요청 처리
    mock.onPost('/buddies').reply((config) => {
      console.log('요청 정보:', config);
      const formData = config.data;
      // const entries = formData.entries();
      // Mock Post 확인용이므로 룰을 잠시 삭제
      // eslint-disable-next-line no-restricted-syntax
      // for (const [key, value] of entries) {
      //   console.log(`${key}: ${value}`);
      // }
      const newBuddy: BuddyProfile = {
        _id: String(Date.now()), // 임시 id
        name: formData.get('name'),
        kind: formData.get('kind'),
        age: formData.get('age'),
        buddyImage: formData.get('buddyImage'),
      };

      setProfiles([...profiles, newBuddy]); // 지금 프로필에 새로운 버디를 추가
      onSubmitBuddy(newBuddy);
      return [200, { success: true, message: '반려동물 등록 성공' }];
    });

    axiosInstance
      .post('/buddies', formData)
      .then((res) => {
        console.log(res.data);

        handleClosePetModal();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleEditSubmit = async () => {
    const buddyId = selectedBuddy?._id;

    // 가짜 PUT 요청 처리
    mock.onPut(`/buddies/${buddyId}`).reply((config) => {
      // console.log('요청 정보:', config);
      const formData = config.data;
      // const entries = formData.entries();
      // // eslint-disable-next-line no-restricted-syntax
      // for (const [key, value] of entries) {
      //   console.log(`${key}: ${value}`);
      // }

      const updatedBuddy = {
        _id: buddyId,
        name: formData.get('name'),
        kind: formData.get('kind'),
        age: formData.get('age'),
        buddyImage: formData.get('buddyImage'),
        sex: formData.get('sex'),
        species: formData.get('species'),
        isNeutered: formData.get('isNeutered'),
        weight: formData.get('weight'),
      };

      // 여기서 필요한 처리를 수행 (예: 데이터 업데이트)

      console.log(updatedBuddy.buddyImage);
      return [200, updatedBuddy]; // 성공 응답 반환
    });

    axiosInstance
      .put(`/buddies/${buddyId}`, formData)
      .then((res) => {
        // 응답으로 수정된 정보가 올 것
        const updatedBuddy = res.data;
        // 수정된 정보로 해당 버디 정보 업데이트
        setSelectedBuddy(updatedBuddy);

        // 버디 프로필들 중, 해당 id의 버디만 업데이트 프로필로 변경해준다.
        const updatedProfiles = profiles.map((profile) => {
          if (profile._id === buddyId) {
            return updatedBuddy;
          }
          return profile;
        });

        // 프로필 상태를 업데이트 된 프로필로 변경
        setProfiles(updatedProfiles);

        handleClosePetEditModal();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <div>
      <ProfilesTitle>{name} 님의 반려동물</ProfilesTitle>
      <StyledSwiper
        virtual
        slidesPerView={4}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Virtual]}
        className="mySwiper"
      >
        {/* 업데이트 된 상태도 렌더링 갱신시켜줘야하기 때문에, buddies가 아닌 profiles를 맵핑 */}
        {profiles &&
          profiles.map((buddy, index) => (
            <SwiperSlide key={buddy._id} virtualIndex={index}>
              <PetCard
                buddy={buddy}
                onEdit={() => handleOpenPetEditModal(buddy._id)}
                onDelete={() => {}}
              />
            </SwiperSlide>
          ))}

        <SwiperSlide key={999} virtualIndex={999}>
          <CardsWrapper>
            <Cards className="add-card" onClick={handleOpenPetModal}>
              <AddProfile>
                <LuPlus />
              </AddProfile>
              <AddProfileMsg>프로필 추가</AddProfileMsg>
            </Cards>
          </CardsWrapper>
        </SwiperSlide>
      </StyledSwiper>
      {petModalOpen && (
        <Modal
          onClose={handleClosePetModal}
          title="동물 정보 등록"
          value="등록"
          component={
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <PetRegister
                petData={null}
                onFormDataChange={handleFormDataChange}
              />
            )
          }
          onHandleClick={handleFormSubmit}
        />
      )}
      {petEditModalOpen && (
        <Modal
          onClose={handleClosePetEditModal}
          title="동물 정보 수정"
          value="수정"
          component={
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <PetRegister
                petData={selectedBuddy}
                onFormDataChange={handleFormDataChange}
              />
            )
          }
          onHandleClick={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default PetProfiles;
