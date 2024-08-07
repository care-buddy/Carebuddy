// 이메일 인증 API, 회원가입 API, 유효성검사 추가 필요

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import axios from 'axios';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';
import LinkButton from '@components/common/LinkButton';

import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

import { tempTerms } from '@constants/tempData';

const BasicRegistration: React.FC = () => {
  const [agreeChecked, setAgreeChecked] = useState(false); // 모두 동의
  const [agreeChecked2, setAgreeChecked2] = useState(false); // 동의1(만 14세 이상)
  const [agreeChecked3, setAgreeChecked3] = useState(false); // 동의2(이용 약관)
  const [viewFullTerms, setViewFullTerms] = useState(false); // 전문 보기
  const [emailVerification, setEmailVerification] = useState({
    status: 'idle',
  }); // 이메일 인증 상태
  const [formData, setFormData] = useState({ // formData
    email: '',
    nickName: '',
    mobileNumber: '',
  });

  // 이메일 인증 핸들러(인증과정 이후 추가되어야 함)
  const submitEmailVerification = () => {
    if (emailVerification.status === 'idle' && formData.email !== '') {
      setEmailVerification({ status: 'inProgress' });
      // 이메일 인증

    }
  };

  // formData 핸들러 - 임시: 디바운싱 적용 or 가입하기 누를 때 할 때 다 가져오기
  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  // useEffect(() => { // 확인용 - 임시
  //   console.log(formData);
  // }, [formData]);

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
            onChange={(e) => handleFormData(e, 'email')}
          />
          <Button
            buttonSize="sm"
            buttonStyle="square-grey"
            onClick={submitEmailVerification}
          >
            발송
          </Button>
        </EmailContainer>
        {emailVerification.status === 'inProgress' && (
          <EmailContainer>
            <Input
              placeholder="메일로 발송된 인증 번호를 입력해주세요."
              placeholderColor="light-grey"
            />
            <Button buttonSize="sm" buttonStyle="square-grey">
              인증
            </Button>
          </EmailContainer>
        )}
      </Section>

      <Section>
        <Heading>회원정보 입력</Heading>
        <P>닉네임*</P>
        <Input
          placeholder="닉네임을 입력해주세요."
          placeholderColor="light-grey"
          onChange={(e) => handleFormData(e, 'nickName')}
        />
        <P>핸드폰 번호*</P>
        <Input
          placeholder="핸드폰 번호(-제외)를 입력해주세요."
          placeholderColor="light-grey"
          onChange={(e) => handleFormData(e, 'mobileNumber')}
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
          <LinkButton linkSize="sm" onClick={handleViewFullTerms}>
            전문 보기
          </LinkButton>
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
