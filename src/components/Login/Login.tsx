/* eslint-disable no-console */
// 임시
// 로그인 코드 짜는 중(한참 미완성임), refresh 토큰 받아야 하고 모달 닫는 함수 인자로 받아야하고 남은 거 많음!

import React, { useState, useEffect } from 'react';
// import { useEffect,  } from 'react'; // 임시 - 가끔 필요해서 냅둠
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';

import axiosInstance from '@/utils/asioxInstance';

import { error } from 'console';

import { handleLoginSuccess } from '@/utils/auth/handleSilentRefresh';

import { LuEye, LuEyeOff } from 'react-icons/lu';

import authState from '@/recoil/atoms/authState';

interface LoginProps {
  onOpenRegistrationModal: () => void;
}

const Login: React.FC<LoginProps> = ({ onOpenRegistrationModal }) => {
  const [keepLogin, setKeepLogin] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [auth, setAuth] = useRecoilState(authState);

  // 로그인을 위한 아이디, 비밀번호 업데이트 핸들러
  const updateLoginInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 비밀번호 보이기 핸들러
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // 체크박스 핸들러
  const handleCheckBoxChange = () => {
    setKeepLogin((prevState) => !prevState);
  };

  // 로그인 핸들러
  const handleLogin = async () => {
    if (loginInfo.email !== '' && loginInfo.password !== '') {
      try {
        console.log('Login attempt with:', loginInfo); // 추가한 부분 - 테스트용

        const response = await axiosInstance.post('auth/login', loginInfo, {
          withCredentials: true,
        });

        const { accessToken } = response.data;

        console.log('Received accessToken:', accessToken); // 추가한 부분 - 테스트용

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Recoil 상태(로그인 상태) 업데이트
        setAuth({
          isAuthenticated: true,
          accessToken,
        });

        // 모달 닫기 실행되어야함 (임시) - 나중에 추가
      } catch (error) {
        // 에러 처리
        console.error('Error during login:', error);
      }
    } else {
      alert('아이디와 비밀번호를 입력해주세요');
    }
  };

  // 상태가 업데이트되면 자동 로그인 연장 처리
  useEffect(() => {
    if (auth.isAuthenticated) {
      handleLoginSuccess(auth.accessToken, auth); // 상태가 업데이트된 후 자동 로그인 연장
    }
  }, [auth]); // auth 상태가 변경될 때마다 실행

  return (
    <Container>
      <LargeText>로그인</LargeText>
      <Input
        name="email"
        placeholderColor="light-grey"
        inputPadding="sm"
        borderStyle="square"
        placeholder="아이디"
        onChange={updateLoginInfo}
      />
      <PasswordContainer>
        <Input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholderColor="light-grey"
          inputPadding="sm"
          borderStyle="square"
          placeholder="비밀번호"
          onChange={updateLoginInfo}
        />
        <IconContainer>
          {showPassword && <LuEye onClick={handleShowPassword} />}
          {!showPassword && <LuEyeOff onClick={handleShowPassword} />}
        </IconContainer>
      </PasswordContainer>

      <SignupSection>
        <CheckBoxSection>
          <CheckBox
            value="keepLogin"
            text="기억하기"
            textColor="black"
            checked={keepLogin}
            onChange={handleCheckBoxChange}
          />
        </CheckBoxSection>
        <Button
          buttonStyle="black"
          buttonSize="sm"
          onClick={onOpenRegistrationModal}
        >
          회원가입
        </Button>
      </SignupSection>
      <LoginContainer>
        <Button buttonStyle="square-green" onClick={handleLogin}>
          로그인
        </Button>
      </LoginContainer>
      <Button buttonStyle="black" buttonSize="sm">
        아이디/비밀번호 찾기
      </Button>
      <Hr />
      {/* <LargeText>간편 로그인/회원가입</LargeText> */}
      <KakaoLoginButton>카카오로 계속하기</KakaoLoginButton>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;

  & > * {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const SignupSection = styled.div`
  padding-bottom: 12px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxSection = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: flex-start;
`;

const Hr = styled.hr`
  margin: 12px 0 18px 0;
  border: 0;
  border-top: 1px solid var(--color-grey-2);
`;

const LargeText = styled.p`
  font-size: var(--font-size-hd-1);
  padding-bottom: 16px;
  font-color: var(--color-black;);
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 12px;

  button {
    width: 100%;
  }
`;

const KakaoLoginButton = styled.div`
  background-color: yellow;
  height: 30px;
`;

const PasswordContainer = styled.div`
  position: relative;

  input {
    // margin-top: 4px;
    width: 100%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 8px;
    color: var(--color-grey-1);
  }
`;
