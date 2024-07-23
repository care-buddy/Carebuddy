import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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
import { Record } from '@/interfaces';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HosRecords from './HosRecords';

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

const DiseaseTitle = styled.h2`
  font-size: var(--font-size-hd-1);
  font-weight: var(--font-weight-medium);
  height: auto;
  margin-left: 10px;
`;

const Paragraph = styled.p``;

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

interface Props {
  record: Record;
}

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const RecordWrapper: React.FC<Props> = ({ record }) => {
  const mock = new MockAdapter(axiosInstance);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record>(record);
  // 모달을 닫았을 때 다시 백업 데이터로 세팅
  const [backupFormData, setBackupFormData] = useState<Record>(record);

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

  const handleEditSubmit = async () => {
    console.log(formData);

    // 가짜 PUT 요청 처리
    // mock.onPut(`/buddies/${buddyId}`).reply((config) => {
    //   // console.log('요청 정보:', config);
    //   const formData = config.data;
    //   // const entries = formData.entries();
    //   // // eslint-disable-next-line no-restricted-syntax
    //   // for (const [key, value] of entries) {
    //   //   console.log(`${key}: ${value}`);
    //   // }

    //   const updatedBuddy = {
    //     _id: buddyId,
    //     name: formData.get('name'),
    //     kind: formData.get('kind'),
    //     age: formData.get('age'),
    //     buddyImage: formData.get('buddyImage'),
    //     sex: formData.get('sex'),
    //     species: formData.get('species'),
    //     isNeutered: formData.get('isNeutered'),
    //     weight: formData.get('weight'),
    //   };

    //   // 여기서 필요한 처리를 수행 (예: 데이터 업데이트)

    //   console.log(updatedBuddy.buddyImage);
    //   return [200, updatedBuddy]; // 성공 응답 반환
    // });

    // axiosInstance
    //   .put(`/buddies/${buddyId}`, formData)
    //   .then((res) => {
    //     // 응답으로 수정된 정보가 올 것
    //     const updatedBuddy = res.data;
    //     // 수정된 정보로 해당 버디 정보 업데이트
    //     setSelectedBuddy(updatedBuddy);

    //     // 버디 프로필들 중, 해당 id의 버디만 업데이트 프로필로 변경해준다.
    //     const updatedProfiles = profiles.map((profile) => {
    //       if (profile._id === buddyId) {
    //         return updatedBuddy;
    //       }
    //       return profile;
    //     });

    //     // 프로필 상태를 업데이트 된 프로필로 변경
    //     setProfiles(updatedProfiles);

    //     handleClosePetEditModal();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setError(error);
    //   });
  };

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
              {record.symptom.length > 0 ? (
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
                record.symptom[0] ?? '증상 기록이 없습니다'
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
              {record.treatment.length > 0 ? (
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
                record.symptom[0] ?? '처방 기록이 없습니다'
              )}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
        <DiaryDetailContainer>
          <Icon>
            <LuMessageSquarePlus />
          </Icon>
          <DiaryDetail>
            <DetailTitle>보호자 메모</DetailTitle>
            <Paragraph>{record.memo ?? '작성한 메모가 없습니다'}</Paragraph>
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
              <HosRecords formData={formData} setFormData={setFormData} />
            }
            onHandleClick={handleEditSubmit}
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
              {record.address ?? '진단 기록이 없습니다'}
              <Doctor> {record.doctorName ?? ''}</Doctor>
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
      </DiaryDetailsRight>
    </Report>
  );
};

export default RecordWrapper;
