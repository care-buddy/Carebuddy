import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';

import axiosInstance from '@/utils/axiosInstance';

import { LuEye, LuEyeOff } from 'react-icons/lu';

import useLogin from '@/hooks/useLogin';
import authState from '@/recoil/atoms/authState';
import userState from '@/recoil/atoms/userState';

import isAuthenticatedState from '@/recoil/selectors/authSelector';
import { useNavigate } from 'react-router-dom';
import validationAlertState from '@/recoil/atoms/validationAlertState';

interface LoginProps {
  onOpenRegistrationModal: () => void;
  handleLoginModal: () => void;
}

const Login: React.FC<LoginProps> = ({
  onOpenRegistrationModal,
  handleLoginModal,
}) => {
  const [keepLogin, setKeepLogin] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [auth, setAuth] = useRecoilState(authState);
  const [, setUser] = useRecoilState(userState);

  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const { handleSilentRefresh } = useLogin();

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

  // // 체크박스 핸들러
  // const handleCheckBoxChange = () => {
  //   setKeepLogin((prevState) => !prevState);
  // };

  // 로그인 핸들러
  const handleLogin = async () => {
    if (loginInfo.email !== '' && loginInfo.password !== '') {
      try {
        // 로그인 API 호출
        const loginResponse = await axiosInstance.post('auth/login', loginInfo);

        const { accessToken } = loginResponse.data; // accessToken 추출
        console.log('Access Token:', accessToken);

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Recoil 상태(로그인 상태) 업데이트
        setAuth({ accessToken });

        // 유저 정보 업데이트를 위해 me API 호출
        const userResponse = await axiosInstance.get('me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(userResponse.data.message);

        // 모달 닫기 실행되어야함 (임시) - 나중에 추가
        handleLoginModal();
      } catch (error) {
        // 에러 처리
        console.error('로그인 중 에러:', error);
      }
    } else {
      alert('아이디와 비밀번호를 입력해주세요');
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    // Recoil 상태 초기화
    setAuth({ accessToken: null }); // authState 초기화
    setUser(null); // 유저 상태 초기화

    // Axios 헤더에서 Authorization 제거
    delete axios.defaults.headers.common.Authorization;

    // 추가적으로 필요한 로그아웃 후 처리 로직을 여기에 추가 가능
  };

  // 상태가 업데이트되면 자동 로그인 연장 처리
  useEffect(() => {
    console.log('isAuthenticated 변경됨:', isAuthenticated); // 상태 변경 확인

    if (!isAuthenticated) {
      return;
    }
    handleSilentRefresh(isAuthenticated); // 상태가 업데이트된 후 자동 로그인 연장
  }, [isAuthenticated]); // auth 상태가 변경될 때마다 실행

  // 임시
  useEffect(() => {
    console.log('현재 authState:', auth); // 현재 authState 확인
  }, [auth]); // auth 상태가 변경될 때마다 실행

  // 페이지가 종료될 때 로그아웃 처리
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      handleLogout(); // 로그아웃 처리
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
        {/* <CheckBoxSection>
          <CheckBox
            value="keepLogin"
            text="기억하기"
            textColor="black"
            checked={keepLogin}
            onChange={handleCheckBoxChange}
          />
        </CheckBoxSection> */}
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
      {/* <Button buttonStyle="black" buttonSize="sm" onClick={handleLogout}>
        로그아웃
      </Button> */}
      <Button buttonStyle="black" buttonSize="sm">
        아이디/비밀번호 찾기
      </Button>
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
  padding: 12px 0;
  display: flex;
  width: 100%;
  align-items: center;
  // justify-content: space-between;
  justify-content: center;
`;

const CheckBoxSection = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: flex-start;
`;

// const Hr = styled.hr`
//   margin: 12px 0 18px 0;
//   border: 0;
//   border-top: 1px solid var(--color-grey-2);
// `;

const LargeText = styled.p`
  font-size: var(--font-size-hd-1);
  padding-bottom: 16px;
  color: var(--color-black); /* 수정: font-color를 color로 변경 */
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 12px;

  button {
    width: 100%;
  }
`;

// const KakaoLoginButton = styled.div`
//   background-color: yellow;
//   height: 30px;
// `;

const PasswordContainer = styled.div`
  position: relative;

  input {
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
