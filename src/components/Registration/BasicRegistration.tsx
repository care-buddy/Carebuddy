import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';

import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

// 임시 데이터
import { tempTerms } from '@constants/tempData';

const BasicRegistration: React.FC = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [agreeChecked2, setAgreeChecked2] = useState(false);
  const [agreeChecked3, setAgreeChecked3] = useState(false);
  const [viewFullTerms, setViewFullTerms] = useState(false); // 전문 보기

  // 체크박스 핸들러
  const handleCheckBoxChange = () => {
    setAgreeChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (agreeChecked) {
      setAgreeChecked2(true);
      setAgreeChecked3(true);
    } else {
      setAgreeChecked2(false);
      setAgreeChecked3(false);
    }
  }, [agreeChecked]);

  const handleCheckBoxChange2 = () => {
    setAgreeChecked2((prevState) => !prevState);
  };
  const handleCheckBoxChange3 = () => {
    setAgreeChecked3((prevState) => !prevState);
  };

  // 전문 보기
  const handleViewFullTerms = () => {
    setViewFullTerms((prevState) => !prevState);
  };

  return (
    <Container>
      <LargeText>회원가입</LargeText>

      <Section>
        <Heading>아이디</Heading>
        <EmailContainer>
          <Input
            placeholder="이메일 형식으로 입력해주세요."
            placeholderColor="light-grey"
          />
          <Button buttonSize="sm" buttonStyle="square-grey">
            발송
          </Button>
        </EmailContainer>
        <p>메일 발송하면 보이는 영역</p>
        <EmailContainer>
          <Input
            placeholder="메일로 발송된 인증 번호를 입력해주세요."
            placeholderColor="light-grey"
          />
          <Button buttonSize="sm" buttonStyle="square-grey">
            인증
          </Button>
        </EmailContainer>
      </Section>

      <Section>
        <Heading>회원정보 입력</Heading>
        <P>닉네임*</P>
        <Input
          placeholder="닉네임을 입력해주세요."
          placeholderColor="light-grey"
        />
        <P>핸드폰 번호*</P>
        <Input
          placeholder="핸드폰 번호(-제외)를 입력해주세요."
          placeholderColor="light-grey"
        />
      </Section>

      <Section>
        <Heading>이용약관 동의</Heading>
        <Hr />
        <CheckBox
          onChange={handleCheckBoxChange}
          value="agree"
          checked={agreeChecked}
          text="모두 동의합니다."
          textColor="black"
        />
        <SmallP>만 14세 이상(필수), 이용약관(필수)</SmallP>

        <Hr />
        <CheckBox
          onChange={handleCheckBoxChange2}
          value="agree2"
          checked={agreeChecked2}
          text="(필수) 만 14세 이상입니다."
          textColor="black"
        />
        <CheckBox
          onChange={handleCheckBoxChange3}
          value="agree3"
          checked={agreeChecked3}
          text="(필수) 이용 약관 동의"
          textColor="black"
        />
        <TermCheckContainer>
          {viewFullTerms && <LuChevronUp />}
          {!viewFullTerms && <LuChevronDown />}
          <Button
            buttonStyle="link"
            buttonSize="sm"
            onClick={handleViewFullTerms}
          >
            전문 보기
          </Button>
        </TermCheckContainer>
        {viewFullTerms && (
          <TermContainer>
            <P2>{tempTerms}</P2>
          </TermContainer>
        )}
      </Section>

      <Section>
        <div>
          <Button buttonStyle="square-green" buttonSize="md">
            가입하기
          </Button>
        </div>
      </Section>
    </Container>
  );
};

export default BasicRegistration;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;

  & > * {
    width: 100%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0;

  & > * {
    margin: 4px 0;
  }

  input {
    width: 100%;
    padding: 8px 6px;
  }
`;

const Heading = styled.p`
  font-size: var(--font-size-md-2);
  padding: 4px 0;
`;

const SmallP = styled.p`
  font-size: var(--font-size-sm-1);
  color: var(--color-grey-1);
`;

const P = styled.p`
  font-size: var(--font-size-ft-1);
  color: var(--color-black);
`;

const Hr = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-grey-2);
  margin: 8px 0;
`;

const P2 = styled.p`
  white-space: pre-wrap;
`;

const TermCheckContainer = styled.div`
  padding-top: 8px;
  display: flex;
`;

const TermContainer = styled.div`
  padding: 12px;
  border: solid black 0.5px;
  font-size: var(--font-size-sm-1);
  line-height: 1.5;
  color: var(--color-grey-1);
`;

const LargeText = styled.p`
  font-size: var(--font-size-hd-1);
  padding-bottom: 8px;
  font-color: var(--color-black;);
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    // width: 18%
  }

  input {
    width: 80%;
  }
`;
