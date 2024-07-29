import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import TopBar from '@/components/common/TopBar';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Record } from '@/interfaces';
import Loading from '@/components/common/Loading';
import ValidationAlert from '@/components/common/ValidationAlert';
import HosRecords from './HosRecords';
import PetProfiles from './PetProfiles';
import { dummyBuddies, dummyRecord, dummyRecord2 } from './dummyData';
import RecordWrapper from './Record';

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

  box-shadow:
    10px 5px 10px -5px rgba(0, 0, 0, 0.2),
    0px 0 15px -5px rgba(0, 0, 0, 0.1);
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
  border-top: 2px solid var(--color-green-sub-2);
  border-bottom: 2px solid var(--color-green-sub-2);
  top: 115px;
  left: 0;
  width: 100%;
  position: absolute;
  /* 반응형 적용해보고 수정 */
  height: 0.3rem;
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

/* 다이어리 끝 */

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

  const nullData: Record = {
    _id: '',
    doctorName: null,
    address: null,
    isConsultation: true,
    consultationDate: null,
    hospitalizationStatus: false,
    disease: '',
    symptom: [],
    treatment: [],
    memo: null,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 기록 등록을 위한 Record 상태
  const [formData, setFormData] = useState<Record>(nullData);

  const [buddiesData, setBuddiesData] = useState<ProfilesWrapperProps | null>(
    null
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [, setError] = useState<Error | null>(null);

  // 반려동물 1마리의 병원 기록들을 저장할 상태
  const [recordsData, setRecords] = useState<Record[] | null>([]);

  // 유효성 검사 알림 상태
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  //
  const [hasRecords, setHasRecords] = useState(false);

  const fetchBuddiesData = async () => {
    // /api/buddies로 GET 요청 모킹
    try {
      setLoading(true);
      mock.onGet('/buddies').reply(200, dummyBuddies);
      const response = await axiosInstance.get('/buddies');
      setBuddiesData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  mock.onGet('/hospitals/1a').reply(200, dummyRecord);
  mock.onGet('/hospitals/2b').reply(200, dummyRecord2);
  const fetchRecordsData = async (buddyId: string) => {
    // /api/hospitals로 GET 요청 모킹
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/hospitals/${buddyId}`);

      setRecords(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBuddiesData();
    // 버디가 있는 경우에는, 첫 번째 버디의 병원 기록을 받아온다
    if (selectedId) fetchRecordsData(selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (recordsData) {
      // 모든 기록이 삭제된 경우에만(null이 아닌 경우) false를 반환
      // 즉 false인 경우에는 기록이 없다는 안내 문구를 보여주면 된다.
      const hasNonDeletedRecords = recordsData.some(
        (record) => record.deletedAt === null
      );
      setHasRecords(hasNonDeletedRecords);
    } else {
      setHasRecords(false);
    }
    console.log(recordsData);
  }, [recordsData]);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

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

  const handleCloseModal = () => {
    setModalOpen(false);
    // 모달이 닫혔을 때, 기존 상태로 돌려줘야함
    setFormData(nullData);
  };

  const handleFormSubmit = () => {
    // POST 요청 모킹
    mock.onPost(`/hospitals`).reply((config) => {
      console.log('요청 정보:', config);
      const formData = JSON.parse(config.data);

      const newRecord: Record = {
        ...formData,
        _id: String(Date.now()),
      };

      if (recordsData) {
        setRecords([...recordsData, newRecord]);
      } else setRecords([newRecord]);
      return [200, { success: true, message: '병원 기록 등록 성공' }];
    });

    if (validateForm() && formData) {
      axiosInstance
        .post(`/hospitals`, formData)
        .then(() => {
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } else setShowAlert(true);
  };

  // PetProfiles가 마운트될 때, 버디프로필이 있다면 실행된다.
  // 따라서 프로필이 있다면 selectedId 상태가 초기값이 null에서 id로 업데이트된다
  const handleSelectedId = (buddyId: string) => {
    setSelectedId(buddyId);
  };

  const handleUpdateRecord = (updatedRecord: Record) => {
    if (recordsData) {
      const updatedRecords = recordsData.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record
      );
      setRecords(updatedRecords);
    }
  };

  mock.onPut(`/hospitals/1r/d`).reply((config) => {
    // 요청에서 데이터 추출
    const deletedRecord = JSON.parse(config.data);

    // 응답으로 삭제된 레코드 반환
    return [200, deletedRecord];
  });
  mock.onPut(`/hospitals/2r/d`).reply((config) => {
    // 요청에서 데이터 추출
    const deletedRecord = JSON.parse(config.data);

    // 응답으로 삭제된 레코드 반환
    return [200, deletedRecord];
  });
  const handleDeleteRecord = async (recordId: string) => {
    // 모킹된 삭제 PUT 요청 설정
    mock.onPut(`/hospitals/${recordId}/d`).reply((config) => {
      // 요청에서 데이터 추출
      const deletedRecord = JSON.parse(config.data);

      // 응답으로 삭제된 레코드 반환
      return [200, deletedRecord];
    });
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        // 현재 상태에서 삭제요청한 record를 찾음
        if (recordsData) {
          const updatedRecord = recordsData.find(
            (record) => record._id === recordId
          );

          if (!updatedRecord) {
            console.error('일치하는 레코드가 없습니다.');
            return;
          }

          // 삭제된 레코드를 업데이트할 데이터 준비
          const deletedRecord: Record = {
            ...updatedRecord,
            deletedAt: new Date(),
          };

          // 서버에 삭제 요청
          await axiosInstance.put(`/hospitals/${recordId}/d`, deletedRecord);

          // 상태 업데이트
          setRecords((prevRecords) =>
            prevRecords
              ? prevRecords.map((record) =>
                  record._id === recordId ? deletedRecord : record
                )
              : null
          );
        }
      } catch (e) {
        console.error(e);
        setError(e as Error);
      }
    }
  };

  const validateForm = () => {
    if (!formData.isConsultation && formData.address === null) {
      setAlertMessage('병원 정보를 입력해 주세요.');
      return false;
    }

    if (formData.disease === '') {
      setAlertMessage('질병 정보를 입력해 주세요.');
      return false;
    }

    return true;
  };

  if (isLoading) return <Loading />;

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
          {recordsData && hasRecords ? (
            recordsData
              // 삭제된 record는 렌더링하지 않음
              .filter((record) => record.deletedAt === null)
              .map((record) => (
                <ReportWrapper key={record._id}>
                  <RecordWrapper
                    // 병원 기록 전달 전달
                    record={record}
                    onUpdate={handleUpdateRecord}
                    onDelete={() => handleDeleteRecord(record._id)}
                  />
                </ReportWrapper>
              ))
          ) : (
            <ReportWrapper className="noReport">
              <div>기록이 없습니다 안내문구</div>
            </ReportWrapper>
          )}
        </DiaryWrapper>
      </Wrapper>
      {showAlert && (
        <ValidationAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default Diary;
