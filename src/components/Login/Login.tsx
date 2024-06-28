import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';

const Login: React.FC = () => {
  const [keepLogin, setKeepLogin] = useState(false);

  const handleCheckBoxChange = () => {
    setKeepLogin((prevState) => !prevState);
  };

  return (
    <Container>
      <LargeText>로그인</LargeText>
      <Input
        placeholderColor="light-grey"
        inputPadding="sm"
        borderStyle="square"
        placeholder="아이디"
      />
      <Input
        placeholderColor="light-grey"
        inputPadding="sm"
        borderStyle="square"
        placeholder="비밀번호"
      />
      <SignupSection>
        <CheckBoxSection>
          <CheckBox
            value="keepLogin"
            text="기억하기"
            checked={keepLogin}
            onChange={handleCheckBoxChange}
          />
        </CheckBoxSection>
        <Button buttonStyle="grey" buttonSize="sm">
          회원가입
        </Button>
      </SignupSection>
      <LoginContainer>
        <Button buttonStyle="square-green">로그인</Button>
      </LoginContainer>
      <Button buttonStyle="grey" buttonSize="sm">
        아이디/비밀번호 찾기
      </Button>
      <Hr />
      <LargeText>간편 로그인/회원가입</LargeText>
      <KakaoLoginButton>카카오로그인 자리</KakaoLoginButton>
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
  padding-bottom: 20px;
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
