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

const RecordWrapper: React.FC<Props> = ({ record }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record>(record);

  console.log(record.symptom[0]);
  const handleOpenEditModal = () => {
    // 수정 모달 표시 여부를 관리하는 함수
    setEditModalOpen(!editModalOpen);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const formatDate = (rowDate: Date) => {
    const date = new Date(rowDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  return (
    <Report>
      <DeseaseName>
        <Icon>
          <TbReportMedical className="big" />
        </Icon>
        <DiseaseTitle>{record.disease}</DiseaseTitle>
        <Paragraph>{formatDate(record.consultationDate)}</Paragraph>
      </DeseaseName>

      <DiaryDetailsLeft>
        <DiaryDetailContainer>
          <Icon>
            <LuActivitySquare />
          </Icon>
          <DiaryDetail>
            <DetailTitle>증상</DetailTitle>
            <Paragraph>
              {record.symptom.length > 1 ? (
                <>
                  {record.symptom[0]}{' '}
                  <Grey>외 {record.symptom.length - 1}개</Grey>
                </>
              ) : (
                record.symptom[0] ?? '증상 기록이 없어요'
              )}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
        <DiaryDetailContainer>
          <Icon>
            <TbBuildingHospital />
          </Icon>
          <DiaryDetail>
            <DetailTitle>입원 여부</DetailTitle>
            <Paragraph>
              {record.hospitalizationStatus ? '입원 중' : '입원하지 않았어요'}
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
        <DiaryDetailContainer>
          <Icon>
            <LuMessageSquarePlus />
          </Icon>
          <DiaryDetail>
            <DetailTitle>보호자 메모</DetailTitle>
            <Paragraph>{record.memo ?? '작성한 메모가 없어요.'}</Paragraph>
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
              {record.treatment.length > 1 ? (
                <>
                  {record.treatment[0]}{' '}
                  <Grey>외 {record.treatment.length - 1}개</Grey>
                </>
              ) : (
                record.treatment[0] ?? '처방 기록이 없어요'
              )}
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
              {record.address ?? '방문 기록이 없어요.'}
              <Doctor> {record.doctorName ?? ''}</Doctor>
            </Paragraph>
          </DiaryDetail>
        </DiaryDetailContainer>
      </DiaryDetailsRight>
    </Report>
  );
};

export default RecordWrapper;
