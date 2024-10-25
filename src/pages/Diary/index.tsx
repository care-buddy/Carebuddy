import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import TopBar from '@/components/common/TopBar';
import { ICreatedAt, IRecord } from '@/types';
import Loading from '@/components/common/Loading';
import ValidationAlert from '@/components/common/ValidationAlert';
import { LuPencilLine } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import buddyState from '@/recoil/atoms/buddyState';
import selectedIdState from '@/recoil/atoms/selectedIdState';
import errorState from '@/recoil/atoms/errorState';
import ErrorAlert from '@/components/common/ErrorAlert';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import axiosInstance from '@/utils/axiosInstance';
import HosRecords from './HosRecords';
import PetProfiles from './PetProfiles';
// import { dummyBuddies, dummyRecord, dummyRecord2 } from './dummyData';
import RecordWrapper from './Record';
import validateRecordForm from './validateRecordForm';

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

  > button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
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

const ProfilesTitle = styled.div`
  font-size: var(--font-size-hd-2);
  font-weight: var(--font-weight-bold);
  margin: 20px 0 30px 0;
`;

const Diary: React.FC = () => {
  // 모달 관련 상태 관리
  const [modalOpen, setModalOpen] = useState(false);

  const nullData: IRecord = {
    doctorName: null,
    address: null,
    consultationStatus: true,
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
  const [formData, setFormData] = useState<IRecord>(nullData);

  const [buddiesData, setBuddiesData] = useRecoilState(buddyState);

  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [isLoading, setLoading] = useState(true);

  // 화면 렌더링 시 버디와 로딩 상태를 공유할 경우, 버디만 렌더링 완료된 경우에 로딩 상태가 false가 되므로 분리한다.
  const [isRecordLoading, setRecordLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);
  const [error, setError] = useRecoilState(errorState);

  // 반려동물 1마리의 병원 기록들을 저장할 상태
  const [recordsData, setRecords] = useState<IRecord[] | null>([]);

  // 유효성 검사 알림 상태
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const [hasRecords, setHasRecords] = useState(false);

  const [isCheckSymptom, setCheckSymptom] = useState(false);
  const [isCheckTreat, setCheckTreat] = useState(false);
  // deletedAt !== null 인 프로필이 하나라도 있으면 false
  const [isAllProfilesDeleted, setIsAllProfilesDeleted] = useState(true);

  const sortedByCreatedAt = <T extends ICreatedAt>(data: T[]): T[] =>
    [...data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const fetchBuddiesData = async () => {
    // /api/buddies로 GET 요청 모킹
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('buddies');

      const fetchedBuddies = response.data.message;

      if (fetchedBuddies.length === 0 || isAllProfilesDeleted) {
        setBuddiesData({
          userName: fetchedBuddies.userName,
          buddies: sortedByCreatedAt(fetchedBuddies.buddies),
        });

        return;
      }

      setBuddiesData({
        userName: fetchedBuddies.userName,
        buddies: sortedByCreatedAt(fetchedBuddies.buddies),
      });

      if (buddiesData.buddies.length > 0 && !selectedId) {
        const firstValidBuddy = buddiesData.buddies.find(
          (buddy) => !buddy.deletedAt
        );

        if (firstValidBuddy) {
          setSelectedId(firstValidBuddy._id);
        }
      }
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordsData = async (buddyId: string) => {
    // /api/hospitals로 GET 요청 모킹
    setRecordLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`hospitals/${buddyId}`);
      // 수정 전 임시

      console.log(response.data.message);
      const sortedRecords: IRecord[] = sortedByCreatedAt(response.data.message);
      setRecords(sortedRecords);
      console.log(recordsData);
    } catch (error) {
      setError(error as Error);
    } finally {
      // 로딩 상태 확인 완료
      setRecordLoading(false);
    }
  };

  useEffect(() => {
    fetchBuddiesData();
  }, []);

  useEffect(() => {
    // 버디가 있는 경우, selectedId가 null일 때(초기상태)
    // 첫 버디가 삭제된 상태일 수 있으니, deletedAt이 null이 아닌 가장 첫 버디를 선택된 상태로 설정한다
    if (buddiesData.buddies.length > 0 && !selectedId) {
      const firstValidBuddy = buddiesData.buddies.find(
        (buddy) => !buddy.deletedAt
      );

      if (firstValidBuddy) {
        setSelectedId(firstValidBuddy._id);
      }
    }

    const isAllDeleted = !buddiesData.buddies.some((buddy) => !buddy.deletedAt);
    setIsAllProfilesDeleted(isAllDeleted);
  }, [buddiesData, selectedId, isAllProfilesDeleted]);

  useEffect(() => {
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
  }, [recordsData]);

  if (error) {
    return <ErrorAlert />;
  }

  // 모달 관련 함수
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // 모달이 닫혔을 때, 기존 상태로 돌려줘야함
    setFormData(nullData);
  };

  // 폼데이터 출력용 테스트 함수
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

  const handleFormSubmit = async () => {
    if (
      validateRecordForm(
        formData,
        setAlertState,
        isCheckSymptom,
        isCheckTreat
      ) &&
      selectedId &&
      formData
    ) {
      setRecordLoading(true);
      setError(null);
      try {
        // 로그인 미구현되어 임시
        const formData2 = {
          ...formData,
          buddyId: selectedId,
        };
        await axiosInstance.post('hospitals', formData2);
        handleCloseModal();
        await fetchRecordsData(selectedId);
      } catch (error) {
        console.error('Error posting data:', error);
        setAlertState({
          showAlert: true,
          alertMessage: alertState.alertMessage,
        });
      } finally {
        setRecordLoading(false);
      }
    }
  };

  const handleUpdateRecord = (updatedRecord: IRecord) => {
    if (recordsData) {
      const updatedRecords = recordsData.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record
      );
      setRecords(updatedRecords);
      if (updatedRecord.buddyId) {
        fetchRecordsData(updatedRecord.buddyId);
      }
    }
  };

  const handleDeleteRecord = async (recordId?: string) => {
    // 삭제 PUT 요청 설정
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        // id로 삭제 요청한 record를 찾음
        if (recordsData) {
          const updatedRecord = recordsData.find(
            (record) => record._id === recordId
          );

          if (!updatedRecord) {
            console.error('일치하는 레코드가 없습니다.');
            return;
          }

          // deletedAt을 업데이트한 레코드
          const deletedRecord: IRecord = {
            ...updatedRecord,
            deletedAt: new Date(),
          };

          setLoading(true);
          setError(null);
          // 서버에 삭제 요청
          await axiosInstance.put(`hospitals/${recordId}/d`, deletedRecord);

          // 상태 업데이트: 삭제 요청한 id만 deletedRecord로 업데이트 해줌
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
      } finally {
        // 로딩 상태 확인 완료
        setLoading(false);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isRecordLoading) return <Loading />;

  return (
    <>
      <TopBar category="건강관리" title="건강 다이어리" />
      <Wrapper>
        <ProfilesTitle>{buddiesData?.userName} 님의 반려동물</ProfilesTitle>
        {/* props drilling 유지하는 이유: userPage에서는 유저마다 다른 buddieData를 전달해줘야하기 때문에 */}
        <PetProfiles
          buddies={buddiesData?.buddies}
          isMe
          fetchBuddiesData={fetchBuddiesData}
        />

        <DiaryWrapper>
          <NameInTitle>
            {!isAllProfilesDeleted ? (
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
          {!isAllProfilesDeleted ? (
            <Button buttonStyle="square-green" onClick={handleOpenModal}>
              <LuPencilLine />
              <span> 다이어리 작성하기</span>
            </Button>
          ) : (
            <span />
          )}

          {modalOpen && (
            <Modal
              onClose={handleCloseModal}
              title="병원 기록"
              value="등록"
              component={
                <HosRecords
                  formData={formData}
                  setFormData={setFormData}
                  setCheckTreat={setCheckTreat}
                  setCheckSymptom={setCheckSymptom}
                />
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
                    // 병원 기록 전달
                    record={record}
                    onUpdate={handleUpdateRecord}
                    onDelete={() => handleDeleteRecord(record._id)}
                  />
                </ReportWrapper>
              ))
          ) : (
            <ReportWrapper className="noReport">
              {!isAllProfilesDeleted ? (
                <div>등록된 병원 기록이 없습니다.</div>
              ) : (
                <div>
                  <p>등록된 반려동물 프로필이 없습니다. </p>
                </div>
              )}
            </ReportWrapper>
          )}
        </DiaryWrapper>
      </Wrapper>
      {alertState.showAlert && (
        <ValidationAlert
          message={alertState.alertMessage}
          onClose={() => setAlertState({ showAlert: false, alertMessage: '' })}
        />
      )}
    </>
  );
};

export default Diary;
