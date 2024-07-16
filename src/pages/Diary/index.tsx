import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Record } from '@/interfaces';
import HosRecords from './HosRecords';
import PetProfiles from './PetProfiles';
import {
  dummyBuddies,
  dummyBuddies2,
  dummyRecord,
  dummyRecord2,
} from './dummyData';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: auto;
`;
// 임시 애니메이션 수정해야함!
const fadeIn = keyframes`
  from {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  to {
    opacity: 1;
  }
`;
/* 다이어리 */

const DiaryWrapper = styled.div`
  /* animation: ${fadeIn} 0.3s ease-in-out; */
  /* transition: all 0.5s ease; */
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 600px;
  padding: 50px 80px 40px 60px;
  border: 2px solid var(--color-grey-2);
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
  animation: ${fadeIn} 0.3s ease-in-out;
  /* height: 100% */
  width: 100%;
  margin-top: 40px;
  margin-bottom: 50px;
  &.noReport {
    animation: none;
    > p {
      padding-bottom: 8px;
    }
  }
  + div {
    margin-top: 80px;
  }
`;

const Paragraph = styled.p``;

// 다이어리 본문 컨테이너
const Report = styled.div`
  padding: 20px 3%;
  margin-top: 24px;
  /* height: 300px; */
  /* border: 2px solid var(--color-grey-2); */
  border-top: 3px solid var(--color-green-sub-2);
  border-radius: 8px;
  /* border-radius: 1rem; */
  box-shadow: 0 6px 12px rgba(0, 20, 0, 0.1);
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
  position: relative;
  > p {
    position: absolute;
    top: 56px;
    left: 36px;
    color: var(--color-grey-1);
    font-size: var(--font-size-ft-1);
  }
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
  border-left: solid 2px rgba(20, 40, 20, 0.1);
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

// 임시, 나중에 폼데이터 인터페이스 통합
interface FormData {
  doctorName?: string;
  consultationDate?: string;
  address?: string;
  disease?: string;
  symptom?: string;
  treatment?: string;
  memo?: string;
  hospitalizationStatus?: Date | null;
}

interface BuddyProfile {
  _id: string;
  name: string;
  kind: string;
  age: number;
  buddyImage: string;
}

interface ProfilesWrapperProps {
  name?: string;
  buddies?: BuddyProfile[];
  onSubmitBuddy: (newBuddy: BuddyProfile) => void;
}

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const Diary: React.FC = () => {
  const mock = new MockAdapter(axiosInstance);
  // 모달 관련 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    doctorName: '',
    consultationDate: '',
    address: '',
    disease: '',
    symptom: '',
    treatment: '',
    memo: '',
    hospitalizationStatus: null,
  });

  const [buddiesData, setBuddiesData] = useState<ProfilesWrapperProps | null>(
    null
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [recordsData, setRecords] = useState<Record[] | null>(null);

  const fetchBuddiesData = async () => {
    // /api/buddies로 GET 요청 모킹
    try {
      setLoading(true);
      mock.onGet('/buddies').reply(200, dummyBuddies);
      const response = await axiosInstance.get('/buddies');
      setBuddiesData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchRecordsData = async (buddyId: string) => {
    // /api/hospitals로 GET 요청 모킹
    try {
      setLoading(true);
      mock.onGet('/hospitals/1a').reply(200, dummyRecord);
      mock.onGet('/hospitals/2b').reply(200, dummyRecord2);
      const response = await axiosInstance.get(`/hospitals/${buddyId}`);
      console.log(response.data);
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // 화면 첫 진입 시, 렌더링해올 데이터들 fetch
  useEffect(() => {
    fetchBuddiesData();
    // 버디가 있는 경우에는, 첫 번째 버디의 병원 기록을 받아온다
    if (selectedId) fetchRecordsData(selectedId);
  }, [selectedId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmitBuddy = (newBuddy: BuddyProfile) => {
    if (buddiesData?.buddies) {
      setBuddiesData({
        ...buddiesData,
        buddies: [...buddiesData.buddies, newBuddy],
      });
    }
  };

  // 모달 관련 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenEditModal = () => {
    // 수정 모달 표시 여부를 관리하는 함수
    setEditModalOpen(!editModalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleFormSubmit = () => {
    console.log('Form data:', formData);

    // 모달 닫기
    handleCloseModal();
  };

  // PetProfiles가 마운트될 때, 버디프로필이 있다면 실행된다.
  // 따라서 프로필이 있다면 selectedId 상태가 초기값이 null에서 id로 업데이트된다
  const handleSelectedId = (buddyId: string) => {
    setSelectedId(buddyId);
  };

  return (
    <>
      <TopBar category="건강관리" title="건강 다이어리" />
      <Wrapper>
        <PetProfiles
          name={buddiesData?.name}
          buddies={buddiesData?.buddies}
          onSubmitBuddy={handleSubmitBuddy}
          onBuddySelect={handleSelectedId}
        />

        <DiaryWrapper>
          <NameInTitle>
            {buddiesData?.buddies && buddiesData.buddies.length > 0 ? (
              <>
                {
                  buddiesData.buddies.find((buddy) => buddy._id === selectedId)
                    ?.name
                }
                <DiaryTitle> 의 건강 다이어리</DiaryTitle>
              </>
            ) : (
              <DiaryTitle>반려동물 프로필을 등록해주세요.</DiaryTitle>
            )}
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
          {recordsData ? (
            recordsData.map((record, index) => (
              <ReportWrapper>
                <Report>
                  <DeseaseName>
                    <Icon>
                      <TbReportMedical className="big" />
                    </Icon>
                    <DeseaseTitle>{record.disease}</DeseaseTitle>
                    <Paragraph>24/07/03</Paragraph>
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
            ))
          ) : (
            <ReportWrapper className="noReport">
              <div>기록이 없습니다 안내문구</div>
            </ReportWrapper>
          )}
          {/* <ReportWrapper>
            <Report>
              <DeseaseName>
                <Icon>
                  <TbReportMedical className="big" />
                </Icon>
                <DeseaseTitle>질병 타이틀</DeseaseTitle>
                <Paragraph>24/07/03</Paragraph>
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
          </ReportWrapper> */}
          {/* <ReportWrapper>
            <Report>
              <DeseaseName>
                <Icon>
                  <TbReportMedical className="big" />
                </Icon>
                <DeseaseTitle>질병 타이틀</DeseaseTitle>
                <Paragraph>24/07/03</Paragraph>
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
          </ReportWrapper> */}
        </DiaryWrapper>
      </Wrapper>
    </>
  );
};

export default Diary;
