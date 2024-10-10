import React from 'react';
import styled from 'styled-components';
import ActionButton from '@/components/common/ActionButton';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';
import { CardsWrapper, Cards } from './card-components';

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
  transition: color 0.5s ease;
  &.selected-card {
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
  transition: color 0.5s ease;
  &.selected-card {
    /* color: var(--color-green-sub-1); */
  }
`;

interface Buddy {
  name: string;
  kind: string;
  birth: string;
  buddyImage: string;
}

interface ProfileCardProps {
  buddy: Buddy;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
  className: string;
  isMe: boolean;
}

const calculateAge = (birth: string): number | string => {
  let birthString = birth;

  // YYYY(숫자)-MM(숫자) 필수 확인, 이후 -DD 는 선택 확인
  // 월, 일은 한글자만 입력되어도 처리 가능
  const dateRegex = /^\d{4}-\d{1,2}(-\d{1,2})?$/;

  if (!dateRegex.test(birthString)) {
    return '유효하지 않은 날짜 형식입니다. 안내 메시지(추가 및 유효성 검사에 추가 필요)';
  }

  // 일을 입력하지 않았다면(00으로 저장) 01일로 계산한다.
  if (birthString.slice(-2) === '00') {
    birthString = `${birthString.slice(0, -2)}01`;
  }

  const birthDate = new Date(birthString); // string을 Date 객체로 변환

  // 입력받은 날짜가 실제 유효한 날짜가 아닌 경우
  if (isNaN(birthDate.getTime())) {
    return '유효하지 않은 날짜 형식입니다. 안내 메시지(추가 및 유효성 검사에 추가 필요)';
  }

  const currentDate = new Date();

  // 최종 계산될 나이 변수
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // 생일이 지났으면 true
  const hasBirthDayPassed =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());

  // 생일이 안지났으니 나이를 하나 줄여준다
  if (!hasBirthDayPassed) {
    age--;
  }

  return age;
};

const PetCard: React.FC<ProfileCardProps> = ({
  buddy,
  onEdit,
  onDelete,
  onClick,
  className,
  isMe,
}) => {
  const age = buddy.birth;

  return (
    <CardsWrapper className={className} onClick={onClick}>
      {isMe && className === 'selected-card' && (
        <ActionButton
          buttonBorder="border-none"
          direction="vertical"
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      <Cards>
        {/* 버디 이미지를 추가하지 않았다면, 기본 이미지가 렌더링 */}
        <Photo src={buddy.buddyImage || DefaultPetProfileImg} />
        <Name className={className}>{buddy.name}</Name>
        <Details className={className}>
          {buddy.kind} / {calculateAge(age)}살
        </Details>
      </Cards>
    </CardsWrapper>
  );
};

export default PetCard;
