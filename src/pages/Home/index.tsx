import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

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
    <Body>
      <Main>
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
        <Button onClick={handleOpenModal3}>동물 등록 모달</Button>
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
          <SmallModal onClose={handleCloseModal4} component={<BasicRegistration />} />
        )}

        <h1>모달 테스트 구역 끝</h1>
        <Banner />
        <ContentContainer>
          <FeedBoxContainer>
            <FeedOptionContainer>
              <SelectContainer>
                <p>분류: </p>
                <select>홈</select>
                <select>그룹</select>
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
          <SidePanel
            name="추천 그룹 or 추천 커뮤니티"
            elementArray={tempGroup}
          />
        </ContentContainer>
      </Main>
    </Body>
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
  // background-color: yellow; // 임시
  color: var(--color-grey-1);
`;

const FeedOptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  // background-color: aqua; // 임시
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm-1);

  & > * {
    margin-right: 10px;
  }
`;

/* 임시 레이아웃 */

const Body = styled.div`
  flex: 1;
  padding-top: 80px;
`;

const Main = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 1024px;
`;

/* 임시 레이아웃 끝 */
