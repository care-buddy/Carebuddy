import React, { useState } from 'react';
import styled from 'styled-components';

import TopBar from '@/components/common/TopBar';
import Button from '@components/common/Button';
import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';
import Select from '@/components/common/Select';

// 로그인 모달 테스트용
import SmallModal from '@/components/common/SmallModal';
import Login from '@/components/Login/Login';

// 동물 등록 모달 테스트용
// import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PetRegister from '@/components/PetRegister/PetRegister';

// 동물 수정 모달 테스트용
// import Button from '@/components/common/Button';
// import Modal from '@/components/common/Modal';
// import PetRegister from '@/components/PetRegister/PetRegister';

// 일반 회원가입 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import BasicRegistration from '@/components/Registration/BasicRegistration';

// 카카오 회원가입 모달 테스트용
// import Button from '@components/common/Button';
// import SmallModal from '@/components/common/SmallModal';
import KakaoRegistration from '@/components/Registration/KaKaoRegistration';

// 임시 데이터
import {
  tempTitle,
  tempContent,
  tempDate,
  tempNickname,
  tempProfileSrc,
  tempPostId,
  tempGroupArray1,
} from '@constants/tempData';

const Home: React.FC = () => {
  const tempGroup = (
    <CommunityElement
      key={tempGroupArray1.groupId}
      groupId={tempGroupArray1.groupId}
      name={tempGroupArray1.groupName}
      introduction={tempGroupArray1.introduction}
      memberCount={tempGroupArray1.memberCount}
    />
  );

  const SelectOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
  ];

  const SelectGroupOptions = [
    { value: 'group', label: '그룹' },
    { value: 'eyes', label: '눈 / 피부 / 귀' },
  ];

  // 로그인 모달 관련 상태&함수
  const [modalOpen1, setModalOpen1] = useState(false);

  const handleOpenModal1 = () => {
    setModalOpen1(true);
  };

  const handleCloseModal1 = () => {
    setModalOpen1(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 회원가입 모달 관련 상태&함수
  const [modalOpen4, setModalOpen4] = useState(false);

  const handleOpenModal4 = () => {
    setModalOpen4(true);
  };

  const handleCloseModal4 = () => {
    setModalOpen4(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 카카오 회원가입 모달 관련 상태&함수
  const [modalOpen5, setModalOpen5] = useState(false);

  const handleOpenModal5 = () => {
    setModalOpen5(true);
  };

  const handleCloseModal5 = () => {
    setModalOpen5(false);
  };

  // const handleFormSubmit = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 동물 등록 모달 관련 상태&함수
  const [modalOpen2, setModalOpen2] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  // const handleFormSubmit2 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  // 동물 정보 수정 모달 관련 상태&함수
  const [modalOpen3, setModalOpen3] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   name: '',
  //   age: 0,
  //   weight: 0,
  //   gender: '',
  //   species: '',
  //   neutered: '',
  // });

  const handleOpenModal3 = () => {
    setModalOpen3(true);
  };

  const handleCloseModal3 = () => {
    setModalOpen3(false);
  };

  // const handleFormSubmit3 = () => {
  //   // console.log('Form data:', formData);
  //   // 모달 닫기
  //   handleCloseModal();
  // };

  return (
    <>
      <TopBar category="반려동물 건강 관리 서비스" title="Carebuddy" />
      <p>배포테스트</p>
      <h1>모달 테스트 구역시작</h1>
      {/* 로그인 */}
      <Button onClick={handleOpenModal1}>로그인 모달</Button>
      {modalOpen1 && (
        <SmallModal onClose={handleCloseModal1} component={<Login />} />
      )}
      {/* 동물등록 */}
      <Button onClick={handleOpenModal2}>동물 등록 모달</Button>
      {modalOpen2 && (
        <Modal
          onClose={handleCloseModal2}
          title="동물 정보 등록"
          value="등록"
          component={
            <PetRegister
            // formData={formData}
            // setFormData={setFormData}
            />
          }
          // onHandleClick={handleFormSubmit2}
        />
      )}
      {/* 동물 정보 수정 */}
      <Button onClick={handleOpenModal3}>동물 수정 모달</Button>
      {modalOpen3 && (
        <Modal
          onClose={handleCloseModal3}
          title="동물 정보 수정"
          value="수정"
          component={
            <PetRegister
            // formData={formData}
            // setFormData={setFormData}
            />
          }
          // onHandleClick={handleFormSubmit3}
        />
      )}
      {/* 일반 회원가입 */}
      <Button onClick={handleOpenModal4}>일반 회원가입 모달</Button>
      {modalOpen4 && (
        <SmallModal
          onClose={handleCloseModal4}
          component={<BasicRegistration />}
        />
      )}
      {/* 카카오 회원가입 */}
      <Button onClick={handleOpenModal5}>카카오 회원가입 모달</Button>
      {modalOpen5 && (
        <SmallModal
          onClose={handleCloseModal5}
          component={<KakaoRegistration />}
        />
      )}

      <h1>모달 테스트 구역 끝</h1>
      <Banner />
      <ContentContainer>
        <FeedBoxContainer>
          <FeedOptionContainer>
            <SelectContainer>
              <P>분류: </P>
              <Select
                selectStyle="round"
                selectSize="sm"
                options={SelectOptions}
              />
              <Select selectStyle="round" options={SelectGroupOptions} />
            </SelectContainer>
            <WriteButton />
          </FeedOptionContainer>
          <FeedBox
            postId={tempPostId}
            title={tempTitle}
            content={tempContent}
            uploadedDate={tempDate}
            nickname={tempNickname}
            profileSrc={tempProfileSrc}
          />
        </FeedBoxContainer>
        <SidePanel name="추천 그룹 or 추천 커뮤니티" elementArray={tempGroup} />
      </ContentContainer>
    </>
  );
};

export default Home;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 20%;
  justify-content: space-between;
  width: 100%;
  margin-top: 80px;

  & > * {
    margin-bottom: 30px;
  }
`;

const FeedBoxContainer = styled.div`
  color: var(--color-grey-1);
`;

const FeedOptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm-1);

  & > * {
    margin-right: 10px;
  }
`;

const P = styled.p`
font-weight: var(--font-weight-medium);
font-size: var(--font-size-ft-1);
`