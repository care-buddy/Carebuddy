/* eslint-disable no-console */
// 임시
// 로그인 코드 짜는 중(한참 미완성임), refresh 토큰 받아야 하고 모달 닫는 함수 인자로 받아야하고 남은 거 많음!

import React, { useState } from 'react';
// import { useEffect,  } from 'react'; // 임시 - 가끔 필요해서 냅둠
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';

import { LuEye, LuEyeOff } from 'react-icons/lu';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api/', // 기본 URL 설정
  timeout: 10000, // 타임아웃 설정 (ms)
});

// const REFRESH_URL = 'auth/token'; // 실제 refresh URL
// const refresh = () => axiosInstance.post(REFRESH_URL); // 예시 구현

// // 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 헤더에 엑세스 토큰 담기
//     const accessToken: string | null = localStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       console.log('요청 인터셉터');
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // access token 재발급
// const getRefreshToken = async (): Promise<string | void> => {
//   try {
//     const res = await refresh();
//     const accessToken = res.data.data?.accessToken;
//     return accessToken;
//   } catch (e) {
//     logout();
//   }
// };

// // 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;
//     // 401에러가 아니거나 재요청이거나 refresh 요청인 경우 그냥 에러 발생
//     if (response.status !== 401 || config.sent || config.url === REFRESH_URL) {
//       return Promise.reject(error);
//     }
//     // 아닌 경우 토큰 갱신
//     config.sent = true; // 무한 재요청 방지
//     const accessToken = await getRefreshToken();
//     if (accessToken) {
//       localStorage.setItem('accessToken', accessToken);
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return axios(config); // 재요청
//   }
// );

interface LoginProps {
  onOpenRegistrationModal: () => void;
}

const Login: React.FC<LoginProps> = ({ onOpenRegistrationModal }) => {
  const navigate = useNavigate();
  const [keepLogin, setKeepLogin] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  // 로그인 API
  const handleLogin = async () => {
    if (loginInfo.email !== '' && loginInfo.password !== '') {
      try {
        const response = await axiosInstance.post('auth/login', loginInfo);

        const { accessToken, refreshToken } = response.data.token;

        console.log(accessToken, refreshToken);

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }
        navigate('/');

        // 모달 닫기 실행되어야함 (임시) - 나중에 추가
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      alert('아이디와 비밀번호를 입력해주세요');
    }
  };

  // // 로그아웃
  // const logout = () => {
  //   localStorage.removeItem('accessToken');
  //   navigate('/');
  // };

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
