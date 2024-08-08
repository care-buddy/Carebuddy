// 데이터 들어오면 로직으로 키그 조정

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LuMessagesSquare, LuCheckCheck } from 'react-icons/lu';

import Button from '../common/Button';

type CommunityCardProps = {
  name: string;
  introduction: string;
  onButtonClick: () => void;
  joined: boolean;
};

const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  introduction,
  onButtonClick,
  joined,
}) => (
  <CardContainer>
    <CardContent to="/">
      <IconContainer>
        <LuMessagesSquare />
      </IconContainer>
      <InfoContainer>
        <Name>{name}</Name>
        <Introduction>{introduction}</Introduction>
      </InfoContainer>
    </CardContent>
    <JoinInfoContainer>
      {joined ? (
        <NoticeContainer>
          <LuCheckCheck />
          <Notice>가입된 그룹입니다</Notice>
        </NoticeContainer>
      ) : (
        <Button
          buttonStyle="square-white"
          buttonSize="sm"
          onClick={onButtonClick}
        >
          가입
        </Button>
      )}
    </JoinInfoContainer>
  </CardContainer>
);

export default CommunityCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 236px;
  height: 170px;
  position: relative;

  border: solid 1px var(--color-grey-2);
  margin-bottom: 20px;
  padding: 16px 16px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const CardContent = styled(Link)`
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
  display: flex;
  flex: 1; 
`;

const IconContainer = styled.div`
  color: var(--color-green-main);
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Name = styled.p`
  color: var(--color-black);
  margin: 0;
`;

const Introduction = styled.pre`
  font-size: var(--font-size-ft-1);
  color: var(--color-grey-1);
  padding: 20px 0;
  line-height: 1.3;
  white-space: pre-wrap;
`;

const JoinInfoContainer = styled.div`
  position: absolute;
  left: 45px;
  bottom: 16px;
`;

const Notice = styled.p`
  color: var(--color-grey-1);
  font-size: var(--font-size-sm-1);
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
      color: var(--color-grey-1);

  & > * {
    margin-right: 4px;
  }
`;
