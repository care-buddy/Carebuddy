import React from 'react';
import styled from 'styled-components';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Radio from '@components/common/Radio';

const ForgotEmail: React.FC = () => (
  <Container>
    <LargeText>아이디 찾기</LargeText>
    {/* <InputContainer> */}
    <StyledInput
      placeholder="가입하신 이메일을 입력해주세요."
      placeholderColor="light-grey"
    />
    {/* </InputContainer> */}
    <Button buttonStyle="square-green">아이디 찾기</Button>
    {/* 일치하는 정보 발견 시 보여줄 부분 */}
    {/* <GreyStyledP>입력하신 정보와 일치하는 계정을 발견했습니다.</GreyStyledP>
    <p>yous****@naver.com</p>
    <LoginContainer>
      <Button buttonStyle="square-green">로그인</Button>
    </LoginContainer>
    <ForgotEmailButtonContainer>
      <Button buttonStyle="link" buttonSize="sm">
        정확한 아이디가 기억나지 않아요!
      </Button>
    </ForgotEmailButtonContainer> */}
    {/* 정확한 아이디 기억 나지 않는다고 하면 보여줄 부분 */}
    {/* <Label htmlFor="radioYes">
      <Radio value="네" checked id="radioYes" />
      <p>가입한 이메일로 찾기</p>
    </Label>
    <Pre>
      회원정보에 등록된 아래의 이메일 주소로 정확한 계정 정보를
      전송하시겠습니까?
    </Pre>
    <P>yous****@naver.com</P>

    <Button buttonStyle="square-green">전송</Button> */}
  </Container>
);

export default ForgotEmail;

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

const LoginContainer = styled.div``;

const ForgotEmailButtonContainer = styled.div`
  width: auto;
`;

const GreyStyledP = styled.p`
  color: var(--color-grey-1);
`;

const Label = styled.label`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: center;
  line-height: 1.4;
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
`;

const P = styled.p`
  color: var(--color-black);
  font-size: var(--font-size-ft-1);
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 8px 4px;
`;
