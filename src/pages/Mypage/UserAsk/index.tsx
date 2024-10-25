import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/Button';
import imgSrc from '@/assets/AlertIcon.png';
import SmallModal from '@/components/common/SmallModal';
import UserTrue from '@/pages/Mypage/UserTrue/index';

import axiosInstance from '@/utils/axiosInstance'; // axios 인스턴스 추가
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '@/recoil/atoms/userState'; // 사용자 상태
import useUpdateMe from '@/hooks/useUpdateMe';
import { User } from '@/types';
import authState from '@/recoil/atoms/authState';

const UserAsk: React.FC<{ onConfirm: () => void, onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const user: User | null = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState); // 사용자 상태 업데이트
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authState);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleWithdraw = async () => {
    const userId = user?._id;

    // 쿠키 삭제 함수 정의
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
    };

    try {
      // 1. me API에 DELETE 요청을 보낸다.
      const response = await axiosInstance.delete(`/me`, {
        data: { userId }
      });

      // 응답 코드가 200일 때
      if (response.status === 200) {
        alert("회원탈퇴가 완료되었습니다.");

        // 로그아웃 처리
        deleteCookie('refreshToken'); // 리프레시 토큰 쿠키 삭제

        setAuth({ accessToken: null }); // 액세스 토큰 초기화

        setUserState(null); // 유저 상태를 null로 설정하여 로그아웃

        navigate('/'); // 메인 페이지로 리다이렉트
      } else {
        console.error("회원탈퇴 요청 실패:", response.data);
      }
    } catch (error) {
      console.error("회원탈퇴 중 오류 발생:", error);
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
        <WithdrawButton onClick={handleWithdraw}>탈퇴하기</WithdrawButton>
        {/* {isModalOpen && (
          <SmallModal
            component={<UserTrue onConfirm={onConfirm} />}
            onClose={handleCloseModal}
          />
        )} */}
      </ButtonContainer>
    </Container>
  );
};

export default UserAsk;

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
