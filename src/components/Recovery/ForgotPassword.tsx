import React from 'react';
import styled from 'styled-components';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Radio from '@components/common/Radio';

const ForgotPassword: React.FC = () => (
  <Container>
    <LargeText>비밀번호 찾기</LargeText>
    <StyledInput
      placeholder="가입하신 이메일을 입력해주세요."
      placeholderColor="light-grey"
    />
    <Button buttonStyle="square-green">비밀번호 찾기</Button>
    {/* 일치하는 정보 발견 시 보여줄 부분 */}
    <Pre>
      입력하신 정보와 일치하는 계정을 발견하여 비밀번호 재설정 링크를 메일로
      발송하였습니다.(이 부분 어떻게 될지 모르겠음)
    </Pre>
    <p>yous****@naver.com</p>
    <Pre>
      이메일이 확인되지 않는 경우 휴지통 또는 스팸메일함을 확인해주세요.
    </Pre>
    <ButtonContainer>
      <Button buttonStyle="square-green">로그인 하기</Button>
    </ButtonContainer>
  </Container>
);

export default ForgotPassword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;

  & > * {
    margin: 4px 0;
    width: 100%;
    display: flex;
    padding-bottom: 8px;
    justify-content: center;
  }

  button {
    width: 100%;
  }
`;

const LargeText = styled.p`
  font-size: var(--font-size-hd-1);
  color: var(--color-black);
  padding-bottom: 16px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 8px 4px;
`;

// const GreyStyledP = styled.p`
// `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    flex: 1;
    margin: 0 4px;
  }
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: center;
  line-height: 1.4;
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
`;
