import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import imgSrc from '@/assets/AlertIcon.png';
import SmallModal from '@/components/common/SmallModal';
import UserTrue from '@/pages/Mypage/UserTrue/index';
import axiosInstance from '@/utils/axiosInstance'; // axios 인스턴스 추가
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '@/recoil/atoms/userState'; // 사용자 상태

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  text-align: center;
  line-height: 23px;
  font-size: var(--font-size-md-1); //16
`;

const Title = styled.p`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md-2); //18
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 40px;
`;

const WithdrawButton = styled.a`
  cursor: pointer;
  font-size: var(--font-size-ft-1);
  margin: 10px;
`;

const UserAsk: React.FC<{ onConfirm: () => void, onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userState); // 현재 로그인된 사용자 정보
  const setUserState = useSetRecoilState(userState); // 사용자 상태 업데이트

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 유저 탈퇴 처리 함수
  const handleWithdraw = async () => {
    try {
      if (user?._id) {
        // 현재 로그인된 사용자의 id를 이용해 DELETE 요청
        await axiosInstance.delete(`/me`);
        setUserState(null); // 사용자 상태 초기화 (로그아웃 효과)
        onConfirm(); // 추가 작업 실행 (예: 페이지 이동, 알림 등)
      }
    } catch (error) {
      console.error("유저 삭제 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <Logo src={imgSrc} />
      <Title>정말 탈퇴하시겠습니까?</Title>
      <Text>
        지금까지 저장되었던 아이들의 프로필과<br />
        소중한 건강체크 기록이 모두 삭제되며 <br />
        재가입해도 복구가 어려워요.
      </Text>
      <ButtonContainer>
        <Button
          buttonStyle='square-green'
          buttonSize='sm'
          onClick={onCancel}
        >
          계속 회원을 유지할래요
        </Button>
        <WithdrawButton onClick={handleOpenModal}>탈퇴하기</WithdrawButton>
        {isModalOpen && (
          <SmallModal
            component={<UserTrue onConfirm={handleWithdraw} />} // 탈퇴 API 호출
            onClose={handleCloseModal}
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default UserAsk;
