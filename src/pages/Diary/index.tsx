import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Virtual } from 'swiper/modules';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { TbReportMedical, TbBuildingHospital } from 'react-icons/tb';
import {
  LuPill,
  LuActivitySquare,
  LuStethoscope,
  LuMessageSquarePlus,
} from 'react-icons/lu';
import ActionButton from '@/components/common/ActtionButton';
import TopBar from '@/components/common/TopBar';
import PetRegister from '@/components/PetRegister/PetRegister';
import HosRecords from './HosRecords';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: auto;
`;

/* 카드프로필 */

const ProfilesWrapper = styled.div`
  height: 400px;
  display: block;
`;

const ProfilesTitle = styled.div`
  font-size: var(--font-size-hd-2);
  font-weight: var(--font-weight-bold);
  margin: 20px 0 30px 0;
`;

/* 카드프로필 끝 */

/* 카드 */

const CardsWrapper = styled.div`
  position: relative;
  height: 300px;
  display: flex;
  width: 100%;
  position: relative;
`;

const Cards = styled.div`
  width: 244px;
  height: 90%;
  /* background: #ffffff; */
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  > button {
    position: absolute;
    top: 15px;
    right: 15px;
    > div {
      position: absolute;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

const Photo = styled.img`
  width: 130px;
  height: 130px;
  background: rgba(152, 185, 156, 0.3);
  border-radius: 50%;
  border: 0;
  overflow: hidden;
  text-align: center;
`;

const Name = styled.p`
  margin-top: 22px;
  height: 26px;
  font-size: var(--font-size-hd-1);
  font-weight: bold;
  line-height: 26px;
  text-align: center;
  margin-bottom: 6px;
  transition: color 0.3s ease;
  &.selectedPet {
    color: var(--color-green-main);
  }
`;

const Details = styled.p`
  width: 100%;
  height: 19px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #7d7d7d;
  margin: 0;
`;

/* 카드 끝 */

/* 다이어리 */

const DiaryWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 50px 80px 40px 60px;
  border: 1px solid #cecece;
  border-radius: 6px 80px 6px 6px;
  margin-top: 100px;
  position: relative;
  margin-bottom: 10%;
`;

const DeseaseTitle = styled.h2`
  font-size: var(--font-size-hd-1);
  font-weight: var(--font-weight-medium);
  height: auto;
  margin-left: 10px;
`;

const NameInTitle = styled.h2`
  font-size: var(--font-size-hd-2);
  font-weight: var(--font-weight-bold);
  height: 115px;
  color: var(--color-green-main);
  > span {
    color: var(--color-black-main);
  }
`;

const DiaryTitle = styled.span``;

const HorizontalLine = styled.div`
  border-top: 3px solid var(--color-green-sub-2);
  top: 115px;
  left: 0;
  width: 100%;
  position: absolute;
`;

// 타이틀을 포함한 다이어리 컨테이너
const ReportWrapper = styled.div`
  height: 280px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 150px;
  &.noReport {
    > p {
      padding-bottom: 8px;
    }
  }
`;

const Paragraph = styled.p``;

// 다이어리 본문 컨테이너
const Report = styled.div`
  padding: 20px 3%;
  margin-top: 24px;
  height: 100%;
  border: 1px solid #7d7d7d;
  border-radius: 6px;
  /* display: flex;
  position: relative; */
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: 1fr 2fr 2fr;
  gap: 20px;
  /* > div:first-child {
    position: absolute;
    top: 20px;
    right: 30px;
  } */
  position: relative;
`;

const DeseaseName = styled.div`
  display: flex;
  height: 26px;
  width: 100%;
  padding-top: 26px;
  /* padding-right: 20px; */
`;

const Icon = styled.div`
  > svg {
    width: 20px;
    height: 20px;
    color: var(--color-green-main);

    &.big {
      width: 24px;
      height: 24px;
    }
  }
`;

/* 다이어리 끝 */

/* 다이어리 상세 : 그리드로 변경 */
const DiaryDetailsLeft = styled.div`
  display: flex;
  border-left: solid 2px #cecece;
  padding: 26px 4%;
  padding-left: 30px;
  flex-direction: column;
  /* width: 35%; */
`;

const DiaryDetailsRight = styled.div`
  display: flex;
  padding: 26px 30px;
  flex-direction: column;
  /* width: 35%; */
  > button {
    position: absolute;

    top: 15px;
    right: 15px;
  }
`;

// 질병에 대한 상세 정보 컨테이너
const DiaryDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DiaryDetail = styled.div`
  margin-left: 15px;
  margin-bottom: 30px;
  /* margin-right: 250px; */
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.p`
  /* width: 300px; */
  font-weight: var(--font-weight-bold);

  + p {
    font-size: var(--font-size-md-1);
    margin-top: 4px;
    line-height: var(--font-size-hd-2);
    white-space: pre-wrap;

    /* > span {
      color: #7d7d7d;
    } */
  }
`;

const Doctor = styled.span`
  color: var(--color-grey-1);
`;

/* 다이어리 상세 끝  */

const StyledSwiper = styled(Swiper)`
  width: 100%;
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

// 프로필이 없을 때
const AddProfile = styled.div`
  width: 100px;
  height: 100px;
  background: var(--color-grey-2);
  border-radius: 50%;
  border: 0;
  overflow: hidden;
`;

const AddProfileMsg = styled.p`
  margin-top: 26px;
  font-size: 18px;
  text-align: center;
  color: #7d7d7d;
`;

const Diary: React.FC = () => {
  // 모달 관련 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [petEditModalOpen, setPetEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phoneNumber: '' });

  // 모달 관련 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenPetModal = () => {
    setPetModalOpen(true);
  };

  const handleOpenEditModal = () => {
    // 수정 모달 표시 여부를 관리하는 함수
    setEditModalOpen(!editModalOpen);
  };

  const handleOpenPetEditModal = () => {
    setPetEditModalOpen(!petEditModalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const handleClosePetModal = () => {
    setPetModalOpen(false);
  };

  const handleClosePetEditModal = () => {
    setPetEditModalOpen(false);
  };

  const handleFormSubmit = () => {
    console.log('Form data:', formData);

    // 모달 닫기
    handleCloseModal();
  };

  return (
    <>
      <TopBar category="건강관리" title="건강 다이어리" />
      <Wrapper>
        <ProfilesWrapper>
          <ProfilesTitle>user 님의 반려동물</ProfilesTitle>
          <StyledSwiper
            virtual
            slidesPerView={4}
            spaceBetween={0}
            // slidesOffsetBefore={20}
            // /* 전체적인 슬라이드의 오른쪽에 20px 공백을 준다. */
            // slidesOffsetAfter={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Virtual]}
            className="mySwiper"
          >
            <SwiperSlide key={0} virtualIndex={0}>
              <CardsWrapper>
                <Cards>
                  <ActionButton
                    buttonBorder="border-none"
                    direction="vertical"
                    onDelete={() => {}}
                    onEdit={handleOpenPetEditModal}
                  />
                  <Photo />
                  <Name>이름</Name>
                  <Details>종 / 나이</Details>
                </Cards>
              </CardsWrapper>
            </SwiperSlide>
            <SwiperSlide key={1} virtualIndex={1}>
              <CardsWrapper>
                <Cards>
                  <AddProfile onClick={handleOpenPetModal} />

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
              component={<PetRegister />}
              onHandleClick={handleFormSubmit}
            />
          )}
          {petEditModalOpen && (
            <Modal
              onClose={handleClosePetEditModal}
              title="동물 정보 수정"
              value="수정"
              component={<PetRegister />}
              onHandleClick={handleFormSubmit}
            />
          )}
        </ProfilesWrapper>
        <DiaryWrapper>
          <NameInTitle className="diaryTitle">
            (반려동물 이름)<DiaryTitle>의 건강 다이어리</DiaryTitle>
          </NameInTitle>
          <HorizontalLine />
          <Button buttonStyle="square-green" onClick={handleOpenModal}>
            기록하기
          </Button>
          {modalOpen && (
            <Modal
              onClose={handleCloseModal}
              title="병원 기록"
              value="등록"
              component={
                <HosRecords formData={formData} setFormData={setFormData} />
              }
              onHandleClick={handleFormSubmit}
            />
          )}
          <ReportWrapper>
            <Paragraph>날짜(컴포넌트화 필요합니다)</Paragraph>

            <Report>
              <DeseaseName>
                <Icon>
                  <TbReportMedical className="big" />
                </Icon>
                <DeseaseTitle>질병 타이틀</DeseaseTitle>
              </DeseaseName>
              <DiaryDetailsLeft>
                <DiaryDetailContainer>
                  <Icon>
                    <LuActivitySquare />
                  </Icon>
                  <DiaryDetail>
                    <DetailTitle>증상</DetailTitle>
                    <Paragraph>
                      {'data.symptom' || '증상 기록이 없어요'}
                    </Paragraph>
                  </DiaryDetail>
                </DiaryDetailContainer>
                <DiaryDetailContainer>
                  <Icon>
                    <TbBuildingHospital />
                  </Icon>
                  <DiaryDetail>
                    <DetailTitle>입원 여부</DetailTitle>
                    <Paragraph>입원중 or 입원하지 않았어요</Paragraph>
                  </DiaryDetail>
                </DiaryDetailContainer>
                <DiaryDetailContainer>
                  <Icon>
                    <LuMessageSquarePlus />
                  </Icon>
                  <DiaryDetail>
                    <DetailTitle>보호자 메모</DetailTitle>
                    <Paragraph>{'data.memo' || '메모 없음'}</Paragraph>
                  </DiaryDetail>
                </DiaryDetailContainer>
              </DiaryDetailsLeft>
              <DiaryDetailsRight>
                <ActionButton
                  buttonBorder="border-none"
                  direction="vertical"
                  onDelete={() => {}}
                  onEdit={handleOpenEditModal}
                />
                {editModalOpen && (
                  <Modal
                    onClose={handleCloseEditModal}
                    title="병원 기록 수정"
                    value="수정"
                    component={
                      <HosRecords
                        formData={formData}
                        setFormData={setFormData}
                      />
                    }
                    onHandleClick={() => {}}
                  />
                )}
                <DiaryDetailContainer>
                  <Icon>
                    <LuPill />
                  </Icon>
                  <DiaryDetail>
                    <DetailTitle>처방</DetailTitle>
                    <Paragraph>
                      {'data.treatment' || '처방 기록이 없어요'}
                    </Paragraph>
                  </DiaryDetail>
                </DiaryDetailContainer>
                <DiaryDetailContainer>
                  <Icon>
                    <LuStethoscope />
                  </Icon>
                  <DiaryDetail>
                    <DetailTitle>동물병원</DetailTitle>
                    <Paragraph>
                      방문 기록 여부
                      <Doctor> 수의사 선생님 성함</Doctor>
                    </Paragraph>
                  </DiaryDetail>
                </DiaryDetailContainer>
              </DiaryDetailsRight>
            </Report>
          </ReportWrapper>
        </DiaryWrapper>
      </Wrapper>
    </>
  );
};

export default Diary;
