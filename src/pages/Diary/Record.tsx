import React, { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Modal from '@/components/common/Modal';
import { TbReportMedical, TbBuildingHospital } from 'react-icons/tb';
import {
  LuPill,
  LuActivitySquare,
  LuStethoscope,
  LuMessageSquarePlus,
} from 'react-icons/lu';
import ActionButton from '@/components/common/ActtionButton';
import { IRecord } from '@/interfaces';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Loading from '@/components/common/Loading';
import ValidationAlert from '@/components/common/ValidationAlert';
import { useRecoilState } from 'recoil';
import loadingState from '@/recoil/atoms/loadingState';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import HosRecords from './HosRecords';
import validateRecordForm from './validateRecordForm';

/* 다이어리 */

const DiseaseTitle = styled.h2`
  font-size: var(--font-size-hd-1);
  font-weight: var(--font-weight-medium);
  height: auto;
  margin-left: 10px;
`;

const Paragraph = styled.p`
  /* 3줄 초과 시 말줄임표로 표현 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Grey = styled.span`
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
`;

// 다이어리 본문 컨테이너
const Report = styled.div`
  padding: 20px 3%;
  margin-top: 24px;
  border-top: 3px solid var(--color-green-sub-2);
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 20, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 20px;
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
  margin-bottom: 1.7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  &.memo {
    margin-bottom: 1rem;
  }
`;

const DetailTitle = styled.p`
  font-weight: var(--font-weight-bold);

  + p {
    font-size: var(--font-size-md-1);
    margin-top: 4px;
    line-height: var(--font-size-hd-2);
    white-space: pre-wrap;
  }
`;

const Doctor = styled.span`
  color: var(--color-grey-1);
`;

/* 다이어리 상세 끝  */

interface Props {
  record: IRecord;
  onUpdate: (updatedRecord: IRecord) => void;
  onDelete: () => void;
}

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const RecordWrapper: React.FC<Props> = ({ record, onUpdate, onDelete }) => {
  // const mock = new MockAdapter(axiosInstance);

  // const [isLoading, setLoading] = useState(false);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<IRecord>(record);
  // 모달을 닫았을 때 다시 백업 데이터로 세팅
  const [backupFormData, setBackupFormData] = useState<IRecord>(record);

  // 유효성 검사 알림 상태
  // const [showAlert, setShowAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState('');
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const [isCheckSymptom, setCheckSymptom] = useState(false);
  const [isCheckTreat, setCheckTreat] = useState(false);

  const handleOpenEditModal = () => {
    // 수정 모달 표시 여부를 관리하는 함수
    setEditModalOpen(!editModalOpen);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setFormData(backupFormData);
  };

  const formatDate = (rowDate: Date, slice: string) => {
    const date = new Date(rowDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${slice}${month}${slice}${day}`;
  };

  // PUT 요청 모킹
  // 1. 가짜 PUT mock 생성
  //  - 업데이트할 객체 생성
  //  - 위 객체로 res 반환
  // mock.onPut(`/hospitals/${record._id}`).reply((config) => {
  //   // put 요청 중 data만 추출, config.data가 문자열로 오기 때문에 추출을 위해 JSON 객체로 파싱해준다
  //   const recordForm = JSON.parse(config.data);

  //   // 업데이트된 정보의 객체를 만들어준다. 이 정보로 response를 보내줄 것임!
  //   const updatedRecord = {
  //     _id: record._id,
  //     doctorName: recordForm.doctorName,
  //     address: recordForm.address,
  //     isConsultation: recordForm.isConsultation,
  //     consultationDate: recordForm.consultationDate,
  //     hospitalizationStatus: recordForm.hospitalizationStatus,
  //     disease: recordForm.disease,
  //     symptom: recordForm.symptom,
  //     treatment: recordForm.treatment,
  //     memo: recordForm.memo,
  //     createdAt: recordForm.createdAt,
  //     deletedAt: recordForm.deletedAt,
  //     updatedAt: new Date(),
  //   };
  //   console.log(updatedRecord);
  //   // 확인용으로 return 해주지만, 실제로는 message와 id만 올 것임
  //   return [200, updatedRecord];
  // });

  // const validateForm = () => {
  //   if (formData.isConsultation && formData.address === '') {
  //     setAlertMessage('병원 정보를 입력해 주세요.');
  //     return false;
  //   }

  //   if (formData.disease === '') {
  //     setAlertMessage('질병 정보를 입력해 주세요.');
  //     return false;
  //   }
  //   if (isCheckSymptom) {
  //     setAlertMessage('증상 내용을 추가하셨는지 확인해주세요.');
  //     return false;
  //   }

  //   if (isCheckTreat) {
  //     setAlertMessage('처방 내용을 추가하셨는지 확인해주세요.');
  //     return false;
  //   }

  //   return true;
  // };

  const handleEditSubmit = async () => {
    // 2. 위 정보로 상태 업데이트
    try {
      setLoading(true);
      /* 모킹에서는 res 받을 일이 없으므로 받지 않는다 */
      if (
        validateRecordForm(
          formData,
          setAlertState,
          isCheckSymptom,
          isCheckTreat
        )
      ) {
        await axiosInstance.put(`/hospitals/${record._id}`, formData);
        setFormData(formData);
        setBackupFormData(formData);
        onUpdate(formData);
        handleCloseEditModal();
        // } else setShowAlert(true);
      }
      // 실제 API 붙인 뒤에도 필요 한지?

      /* if (validateForm() && formData) {
      axiosInstance
        .post(`/hospitals`, formData)
        .then(() => {
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } else setShowAlert(true); */
    } catch (e) {
      console.log(e);
    } finally {
      /* 로딩 컴포넌트가 화면 전체를 덮는 것을 확인 */
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Report>
      <DeseaseName>
        <Icon>
          <TbReportMedical className="big" />
        </Icon>
        <DiseaseTitle>{record.disease}</DiseaseTitle>
        <Paragraph>{formatDate(record.createdAt, '/')}</Paragraph>
      </DeseaseName>

      <DiaryDetailsLeft>
        <DiaryDetailContainer>
          <Icon>
            <LuActivitySquare />
          </Icon>
          <DiaryDetail>
            <DetailTitle>증상</DetailTitle>
            <Paragraph>
              {record.symptom && record.symptom.length > 0 ? (
                <>
                  {record.symptom[0]}
                  {record.symptom[1] ? `, ${record.symptom[1]}` : ''}
                  {record.symptom.length - 2 > 0 ? (
                    <Grey> 외 {record.symptom.length - 2}개</Grey>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                (record.symptom && record.symptom[0]) ?? '증상 기록이 없습니다'
              )}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
        <DiaryDetailContainer>
          <Icon>
            <LuPill />
          </Icon>
          <DiaryDetail>
            <DetailTitle>처방</DetailTitle>
            <Paragraph>
              {record.treatment && record.treatment.length > 0 ? (
                <>
                  {record.treatment[0]}
                  {record.treatment[1] ? `, ${record.treatment[1]}` : ''}
                  {record.treatment.length - 2 > 0 ? (
                    <Grey> 외 {record.treatment.length - 2}개</Grey>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                (record.treatment && record.treatment[0]) ??
                '처방 기록이 없습니다'
              )}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
        <DiaryDetailContainer>
          <Icon>
            <LuMessageSquarePlus />
          </Icon>
          <DiaryDetail className="memo">
            <DetailTitle>보호자 메모</DetailTitle>
            <Paragraph>{record.memo ?? '작성한 메모가 없습니다'}</Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
      </DiaryDetailsLeft>
      <DiaryDetailsRight>
        <ActionButton
          buttonBorder="border-none"
          direction="vertical"
          onDelete={onDelete}
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
                setCheckTreat={setCheckTreat}
                setCheckSymptom={setCheckSymptom}
              />
            }
            onHandleClick={handleEditSubmit}
          />
        )}
        {alertState.showAlert && (
          <ValidationAlert
            message={alertState.alertMessage}
            onClose={() =>
              setAlertState({ showAlert: false, alertMessage: '' })
            }
          />
        )}
        <DiaryDetailContainer>
          <Icon>
            <LuStethoscope />
          </Icon>
          <DiaryDetail>
            <DetailTitle>진료 날짜</DetailTitle>
            <Paragraph>
              {record.consultationDate
                ? formatDate(record.consultationDate, '/')
                : '진단 기록이 없습니다'}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>

        <DiaryDetailContainer>
          <Icon>
            <TbBuildingHospital />
          </Icon>
          <DiaryDetail>
            <DetailTitle>동물병원</DetailTitle>
            <Paragraph>
              {record.address && `${record.address} `}
              {!record.address && !record.doctorName && '병원 기록이 없습니다'}
              <Doctor>
                {record.doctorName ? `${record.doctorName} 선생님` : ''}
              </Doctor>
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
      </DiaryDetailsRight>
    </Report>
  );
};

export default RecordWrapper;
