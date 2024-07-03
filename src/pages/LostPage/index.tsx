import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/common/Button';

import carebuddyLogo from '@/assets/carebuddyLogo.png';
import notFoundImg from '@/assets/notFoundImg.png';

const LostPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMainButtonClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <LogoContainer>
        <Logo src={carebuddyLogo} alt="로고" onClick={handleMainButtonClick} />
      </LogoContainer>
      <Img src={notFoundImg} alt="404 에러 이미지" />
      <TextContainer>
        <BigText>
          죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
        </BigText>
        <Text>존재하지 않는 주소를 입력하셨거나,</Text>
        <Text>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</Text>
      </TextContainer>
        <Button
          buttonStyle="square-green"
          buttonSize="md"
          onClick={handleMainButtonClick}
        >
          메인으로
        </Button>
    </Container>
  );
};

export default LostPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 180px;
  padding: 16px 16px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 600px;
  background-color: red;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.4;
  padding: 10px 0 14px 0;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const BigText = styled.p`
  color: var(--color-black);
  font-size: var(--font-size-md-2);
  font-weight: var(--font-weight-semibold);
  padding: 8px 0;
`;

const Text = styled.p`
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
  line-height: 1.2;
`;
