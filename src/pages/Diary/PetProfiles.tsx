import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Virtual } from 'swiper/modules';
import { LuPlus } from 'react-icons/lu';
import Modal from '@/components/common/Modal';
import PetRegister from '@/components/PetRegister/PetRegister';
import { IBuddy, IBuddyProfile, IProfilesWrapperProps } from '@/types';
import Loading from '@/components/common/Loading';
import ValidationAlert from '@/components/common/ValidationAlert';
import {
  useRecoilState,
  // eslint-disable-next-line camelcase
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE,
} from 'recoil';
import selectedIdState from '@/recoil/atoms/selectedIdState';
import errorState from '@/recoil/atoms/errorState';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import loadingState from '@/recoil/atoms/loadingState';
import axiosInstance from '@/utils/axiosInstance';

import { CardsWrapper, Cards } from './card-components';
import PetCard from './PetCard';

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

// 회원 이름과 버디 정보들을 받아와서 카드에 렌더링해준다.
const PetProfiles: React.FC<IProfilesWrapperProps> = ({
  buddies,
  isMe = true,
  fetchBuddiesData,
}) => {
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [petEditModalOpen, setPetEditModalOpen] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState<IBuddy | null>(null); // 선택된 반려동물, 모달용
  const [formData, setFormData] = useState<FormData | null>(null); // 수정/등록을 위한 폼데이터 상태

  const [profiles, setProfiles] = useState<IBuddyProfile[]>(buddies || []); // 반려동물 전체 프로필 상태: 등록 및 수정을 위함

  // 반려동물이 있는 경우에만, 처음 렌더링될 때 처음 버디를 선택된 상태로 설정
  // 병원 기록, 선택된 카드 활성화를 위한 상태
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  // API 적용 후 recoil 적용
  const [isLoading, setLoading] =
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE(loadingState);
  // 에러를 recoil로 사용하니 에러 띄운 화면에서 다른 화면 이동 시 에러가 유지되는 듯 함, 에러를 다른 api 호출 시 null로 만들어줘야함.. 에러는 리코일 활용을 안하는게 맞는지?
  const [, setError] = useRecoilState(errorState);

  // 유효성 검사 알림 상태
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const handleOpenPetModal = () => {
    setPetModalOpen(true);
  };

  const handleOpenPetEditModal = async (buddyId: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`buddies/${buddyId}`);

      setSelectedBuddy(response.data.message[0]); // 가져온 반려동물 정보 설정, 수정(PUT) 요청 시 여기서 id를 가져올 수 있다
      setPetEditModalOpen(true);
    } catch (error) {
      setError(error as Error);
      console.error(error);
      alert(
        '불러오는 데 오류 발생 다시 시도해주세요 오류메시지를 다시 설정해주세요'
      );
      setError(null);
    } finally {
      setLoading(false);
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

  const deleteProfile = async (buddyId: string) => {
    if (window.confirm(`프로필을 삭제하시겠습니까?`)) {
      try {
        setLoading(true);

        if (profiles) {
          const filterdProfile = profiles.find(
            (profile) => profile._id === buddyId
          );

          if (!filterdProfile) {
            return;
          }

          const deletedProfile: IBuddyProfile = {
            ...filterdProfile,
            deletedAt: new Date(),
          };
          await axiosInstance.put(`buddies/${buddyId}/d`);
          // await axiosInstance.put(`buddies/${buddyId}/d`);

          const updatedProfiles = profiles.map((profile) =>
            profile._id === buddyId ? deletedProfile : profile
          );

          setProfiles([...updatedProfiles]);

          // 삭제된 카드를 컴포넌트에서 보이지 않게 업데이트
          await fetchBuddiesData?.();

          // 프로필 삭제 후 카드 선택 상태를 삭제하지 않은 첫 번째 카드로 지정
          const firstValidBuddy = updatedProfiles.find(
            (buddy) => !buddy.deletedAt
          );

          if (firstValidBuddy) {
            setSelectedId(firstValidBuddy._id);
          }
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
        window.location.reload(); // 페이지 새로고침 추가
      }
    }
  };

  // 로딩처리 필요
  const handleFormSubmit = async () => {
    if (validateForm() && formData) {
      setLoading(true);
      try {
        // 아직 로그인 로직이 구현되어 있지 않기 때문에, 폼데이터에 id 지정해줘야함

        const response = await axiosInstance.post(
          'buddies',
          // formDataToJson(formData)
          formData
        );
        handleClosePetModal();
        await fetchBuddiesData?.();
        setSelectedId(response.data.data);

        // 추후 슬라이더가 마지막 슬라이드로 이동되는 기능 추가하면 좋을 것 같음: 구현이 너무 오래걸려 추후에 구현하기로
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const formDataToJson = (formData: FormData) => {
  //   const obj: { [key: string]: any } = {};

  //   for (const [key, value] of formData.entries()) {
  //     // FormData.entries()에서 value가 Blob일 경우, 직접 변환하기 어려우므로
  //     // 텍스트로 변환할 수 있는 경우를 제외하고는 문자열로 저장합니다.
  //     if (value instanceof Blob) {
  //       obj[key] = value instanceof File ? value.name : value.toString();
  //     } else {
  //       obj[key] = value;
  //     }
  //   }

  //   return obj;
  // };

  const handleEditSubmit = async () => {
    const buddyId = selectedBuddy?._id;

    // 폼데이터 콘솔 확인용 함수입니다
    // const printFormData = (formData: FormData) => {
    //   // FormData.entries()를 사용하여 모든 항목을 순회합니다.
    //   for (const [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    //   }
    // };

    // formData를 사용하여 요청하기 전에 폼 데이터 내용 출력
    // printFormData(formData);
    if (validateForm() && formData) {
      // 로딩 처리 확인
      setLoading(true);
      // 아직 로그인 로직이 구현되어 있지 않기 때문에, 폼데이터에 id 지정해줘야함
      // formData?.append('userId', '66b9b34ae9a13c88c643e361');
      try {
        setLoading(true);

        // 이미지 로직 적용 시 완전 바뀌어야 하므로 임시 구현(formData만 전송하도록 바꿔야한다) / formDataToJson 함수 삭제해야함
        const res = await axiosInstance.put(`buddies/${buddyId}`, formData);

        // 응답으로 수정된 정보가 올 것
        const updatedBuddy = res.data.data;

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
        await fetchBuddiesData?.();
        setSelectedId(updatedBuddy._id);
        handleClosePetEditModal();
      } catch (error) {
        console.log(error);
        setError(error as Error);
        // } else setShowAlert(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectedId = (buddyId: string) => {
    // className 변경을 위해 상태를 업데이트 해준다. 업데이트한 id와 같은 id의 카드가 활성화된다
    setSelectedId(buddyId);
    // 병원 기록을 불러올 id를 전달하기 위해 상위 컴포넌트(index)에 선택된 버디의 id를 전달해준다
    // ?? optional chaining 사용해도 문제 없는지 확인 필요
    // onBuddySelect?.(buddyId);
  };

  const validateForm = () => {
    // 체중을 제외한 유효성 검사
    if (formData) {
      if (formData.get('name') === '' || formData.get('name') === null) {
        setAlertState({
          showAlert: true,
          alertMessage: '이름을 입력해주세요.',
        });
        return false;
      }
      // formData는 문자열로 전송
      if (formData.get('sex') === 'null') {
        setAlertState({
          showAlert: true,
          alertMessage: '성별을 선택해주세요.',
        });
        return false;
      }
      if (formData.get('species') === 'null') {
        setAlertState({
          showAlert: true,
          alertMessage: '종을 선택해주세요.',
        });
        return false;
      }
      if (formData.get('kind') === '') {
        setAlertState({
          showAlert: true,
          alertMessage: '품종을 입력해주세요.',
        });
        return false;
      }
      if (formData.get('age') === '') {
        setAlertState({
          showAlert: true,
          alertMessage: '나이를 입력해주세요.',
        });
        return false;
      }
      if (formData.get('isNeutered') === 'null') {
        setAlertState({
          showAlert: true,
          alertMessage: '중성화 여부를 선택해주세요.',
        });
        return false;
      }

      const birth = formData.get('birth') as string;
      if (birth.split('-')[0].length !== 4) {
        setAlertState({
          showAlert: true,
          alertMessage: '생년월일을 올바르게 입력해주세요.',
        });
        return false;
      }
      const month = birth.split('-')[1]; // 생년월일의 월 부분

      if (Number(month) < 1 || Number(month) > 12) {
        setAlertState({
          showAlert: true,
          alertMessage: '생년월일을 올바르게 입력해주세요.',
        });
        return false;
      }

      if (month === '00') {
        setAlertState({
          showAlert: true,
          alertMessage: '생년월일을 올바르게 입력해주세요.',
        });
        return false;
      }
    }

    return true;
  };

  if (isLoading) return <Loading />;

  return (
    <div>
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
          profiles
            .filter((profile) => profile.deletedAt === null)
            .map((buddy, index) => (
              <SwiperSlide key={buddy._id} virtualIndex={index}>
                <PetCard
                  buddy={buddy}
                  onEdit={() => handleOpenPetEditModal(buddy._id)}
                  onDelete={() => {
                    deleteProfile(buddy._id);
                  }}
                  onClick={() => {
                    handleSelectedId(buddy._id);
                  }}
                  className={
                    isMe && buddy._id === selectedId
                      ? 'selected-card'
                      : 'not-selected-card'
                  }
                  isMe={isMe}
                />
              </SwiperSlide>
            ))}

        {isMe && (
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
        )}
      </StyledSwiper>
      {petModalOpen && (
        <Modal
          onClose={handleClosePetModal}
          title="동물 정보 등록"
          value="등록"
          component={
            isLoading ? (
              <Loading />
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
              <Loading />
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
      {alertState.showAlert && (
        <ValidationAlert
          message={alertState.alertMessage}
          onClose={() => setAlertState({ showAlert: false, alertMessage: '' })}
        />
      )}
    </div>
  );
};

export default PetProfiles;
