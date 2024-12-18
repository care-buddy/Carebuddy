import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import axiosInstance from '@/utils/axiosInstance';

import { LuEye, LuEyeOff } from 'react-icons/lu';

import useLogin from '@/hooks/useLogin';
import authState from '@/recoil/atoms/authState';
import userState from '@/recoil/atoms/userState';

import isAuthenticatedState from '@/recoil/selectors/authSelector';

interface LoginProps {
  handleLoginModal: () => void;
  onOpenRegistrationModal: () => void;
  onOpenFindingIdModal?: () => void;
  onOpenFindingPasswordModal?: () => void;
}

const Login: React.FC<LoginProps> = ({
  handleLoginModal,
  onOpenRegistrationModal,
  onOpenFindingIdModal,
  onOpenFindingPasswordModal,
}) => {
  // const [keepLogin, setKeepLogin] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [, setAuth] = useRecoilState(authState);
  const [, setUser] = useRecoilState(userState);

  const [, setLoading] = useState(true);

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
  // 로그인 요청 핸들러
  const handleLogin = async () => {
    if (loginInfo.email !== '' && loginInfo.password !== '') {
      setLoading(true);
      try {
        const loginResponse = await axiosInstance.post('auth/login', loginInfo);
        console.log('로그인응답', loginResponse);

        const { accessToken } = loginResponse.data;
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Recoil 상태에 accessToken 저장
        setAuth({ accessToken });

        // 사용자 정보 요청 시 명시적으로 accessToken 포함
        await fetchUserInfo(accessToken);

        // 모달 닫기
        handleLoginModal();
      } catch (error) {
        alert(
          '아이디 또는 비밀번호가 잘못 되었습니다. 입력한 내용을 다시 확인해 주세요.'
        );
      } finally {
        setLoading(false);
      }
    } else {
      alert('아이디와 비밀번호를 입력해주세요');
    }
  };

  // me API 호출
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const userResponse = await axiosInstance.get('me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(userResponse.data.message);
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  };

  // 상태가 업데이트되면 자동 로그인 연장 처리
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    handleSilentRefresh(isAuthenticated); // 상태가 업데이트된 후 자동 로그인 연장
  }, [isAuthenticated]); // auth 상태가 변경될 때마다 실행

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
        value="carebuddy2024@gmail.com"
        onClick={(e) => e.stopPropagation()}
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
          value="Cbcb2024"
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
      </SignupSection>
      <LoginContainer>
        <Button buttonStyle="square-green" onClick={handleLogin}>
          로그인
        </Button>
      </LoginContainer>
      <ButtonContainer>
        <Button
          buttonStyle="black"
          buttonSize="sm"
          onClick={onOpenRegistrationModal}
        >
          회원가입
        </Button>
        <ButtonDivider>|</ButtonDivider>
        <Button
          buttonStyle="black"
          buttonSize="sm"
          onClick={onOpenFindingIdModal}
        >
          아이디 찾기
        </Button>
        <ButtonDivider>|</ButtonDivider>
        <Button
          buttonStyle="black"
          buttonSize="sm"
          onClick={onOpenFindingPasswordModal}
        >
          비밀번호 찾기
        </Button>
      </ButtonContainer>
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

// const CheckBoxSection = styled.div`
//   padding: 8px 0;
//   display: flex;
//   flex-direction: flex-start;
// `;

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

const ButtonContainer = styled.div`
  display: flex;
`;

const ButtonDivider = styled.p`
  color: var(--color-grey-2);
  font-weight: var(--font-weight-regular);
  background-color: transparent;
  padding: 0 4px;
`;
