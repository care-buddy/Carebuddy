// 이메일 인증 API, 회원가입 API, 유효성검사 추가 필요

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import CheckBox from '@components/common/CheckBox';
import LinkButton from '@components/common/LinkButton';

import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

import { tempTerms } from '@constants/tempData';

interface BasicRegistrationProps {
  onClose: () => void;
}

const BasicRegistration: React.FC<BasicRegistrationProps> = ({ onClose }) => {
  const [agreeChecked, setAgreeChecked] = useState(false); // 모두 동의
  const [agreeChecked2, setAgreeChecked2] = useState(false); // 동의1(만 14세 이상)
  const [agreeChecked3, setAgreeChecked3] = useState(false); // 동의2(이용 약관)
  const [viewFullTerms, setViewFullTerms] = useState(false); // 전문 보기
  const [emailVerification, setEmailVerification] = useState({
    status: 'idle',
  }); // 이메일 인증 상태
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    nickName: '',
    mobileNumber: '',
    password: '',
    passwordCheck: '',
  });
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 상태

  // 이메일 인증 핸들러(인증과정 이후 추가되어야 함)
  const submitEmailVerification = async () => {
    if (
      emailVerification.status === 'idle' ||
      emailVerification.status === 'inProgress'
    ) {
      if (formData.email === '') {
        // 이메일이 공백일 경우
        alert('이메일을 입력해주세요.');
      } else {
        try {
          const response = await axiosInstance.post('auth/validate-email', {
            email: formData.email,
          });

          if (response.status === 201) {
            alert('해당 아이디로 가입이 가능합니다');

            setEmailVerification((prev) => ({
              ...prev,
              status: 'inProgress', // 원하는 속성만 변경
            }));
            // 이메일 인증번호 보내기
            await axiosInstance.post('auth/send-email', {
              email: formData.email,
            });
            setTimeLeft(300); // 300초 = 5분
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            // 에러 응답 상태 코드가 409일 때
            if (error.response.status === 409) {
              alert('이미 가입된 아이디입니다.');
            } else {
              // 다른 상태 코드일 때
              alert(
                '이메일 유효성 검사 중 오류가 발생했습니다. 다시 시도해주세요.'
              );
            }
          } else {
            console.error('알 수 없는 오류:', error);
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
          }
        }
      }
    }
  };

  const handleVerificationButton = async () => {
    if (emailVerification.status === 'inProgress') {
      if (formData.verificationCode === '') {
        alert('전송된 인증번호를 입력해주세요');
      } else {
        try {
          const response = await axiosInstance.post('auth/validate-authCode', {
            email: formData.email,
            authCode: formData.verificationCode,
          });

          if (response.status === 200) {
            alert('인증이 성공적으로 완료되었습니다!');
            setEmailVerification({
              status: 'succeed',
            });
          } else {
            setEmailVerification({
              status: 'failed',
            });
          }
        } catch (error) {
          alert('인증 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  // 타이머 함수는 useEffect 안에서 직접 처리하도록 수정
  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            setEmailVerification((prev) => ({
              ...prev, // 이전 상태를 복사
              status: 'idle', // 원하는 속성만 변경
            }));
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // 1초마다 호출

      // 컴포넌트가 언마운트 될 때 또는 타이머가 재시작될 때 setInterval을 정리
      return () => clearInterval(countdown);
    }
  }, [timeLeft]);

  // formData 핸들러 - 임시: 디바운싱 적용 or 가입하기 누를 때 할 때 다 가져오기
  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  // 체크박스 핸들러
  const handleCheckBoxChange = () => {
    setAgreeChecked((prevState) => !prevState);
  };

  // 가입 API
const handleRegisterButton = async () => {
  // 유효성 검사
  if (emailVerification.status !== 'succeed') {
    alert('이메일 인증을 완료해주세요.');
    return;
  }

  if (
    !formData.nickName ||
    !formData.email ||
    !formData.mobileNumber ||
    !formData.password ||
    !formData.passwordCheck
  ) {
    alert('모든 필수 입력 필드를 작성해주세요.');
    return;
  }

  if (formData.password !== formData.passwordCheck) {
    alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    return;
  }

  // 비밀번호 복잡성 검사 (6자 이상, 영문자 대/소문자 혼합)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordPattern.test(formData.password)) {
    alert('비밀번호는 영문자 대문자, 소문자를 혼용하여 6자 이상으로 설정해주십시오.');
    setFormData({
      ...formData,
      password: '',
      passwordCheck: '',
    });
    return;
  }

  // 핸드폰 번호 유효성 검사 (숫자만 포함, 10~11자리)
  const phonePattern = /^\d{10,11}$/;
  if (!phonePattern.test(formData.mobileNumber)) {
    alert('유효한 핸드폰 번호를 입력해주세요. 숫자만 포함하여 10자리 또는 11자리여야 합니다.');
    setFormData({
      ...formData,
      mobileNumber: '',
    });
    return;
  }

  try {
    const signupResponse = await axiosInstance.post('auth/signup', {
      nickName: formData.nickName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
    });

    if (signupResponse.status === 201) {
      console.log('회원가입 성공');
      alert('회원가입이 완료되었습니다!');
      onClose(); // 모달 닫기
    } else {
      console.error('회원가입 실패');
      console.log('response', signupResponse);
      alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  } catch (error) {
    console.error('회원가입 오류:', error);
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
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
          {emailVerification.status === 'idle' && (
            <Button
              buttonSize="sm"
              buttonStyle="square-grey"
              onClick={submitEmailVerification}
            >
              발송
            </Button>
          )}
          {emailVerification.status === 'succeed' && (
            <Button
              buttonSize="sm"
              buttonStyle="square-grey"
              onClick={submitEmailVerification}
            >
              인증 완료
            </Button>
          )}
          {emailVerification.status === 'inProgress' && (
            <Timer>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</Timer>
          )}
        </EmailContainer>
        {emailVerification.status === 'inProgress' && (
          <>
            <EmailContainer>
              <Input
                placeholder="메일로 발송된 인증 번호를 입력해주세요."
                placeholderColor="light-grey"
                onChange={(e) => handleFormData(e, 'verificationCode')}
              />
              <Button
                buttonSize="sm"
                buttonStyle="square-grey"
                onClick={handleVerificationButton}
              >
                인증
              </Button>
            </EmailContainer>
            <ResendVerificationCode>
              <Button
                buttonSize="sm"
                buttonStyle="grey"
                onClick={submitEmailVerification}
              >
                인증번호 다시 전송하기
              </Button>
            </ResendVerificationCode>
          </>
        )}
      </Section>

      <Section>
        <Heading>비밀번호</Heading>
        <PasswordText>
          비밀번호는 영문자 대문자, 소문자를 혼용하여 6자 이상으로
          설정해주십시오.
        </PasswordText>
        <PasswordContainer>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            placeholderColor="light-grey"
            onChange={(e) => handleFormData(e, 'password')}
          />
          <Input
            type="password"
            placeholder="비밀번호를 새로 입력해주세요"
            placeholderColor="light-grey"
            onChange={(e) => handleFormData(e, 'passwordCheck')}
          />
        </PasswordContainer>
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
          <Button
            buttonStyle="square-green"
            buttonSize="md"
            onClick={handleRegisterButton}
          >
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

  button,
  div {
    width: 18%;
  }

  input {
    width: 80%;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    width: 80%;
  }

  & > * {
    margin-bottom: 10px;
  }
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  background-color: var(--color-grey-3);
  color: black;
  border: none;
  padding: 8px 16px;
  font-size: var(--font-size-ft-1);
`;

const ResendVerificationCode = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PasswordText = styled.p`
  color: var(--color-grey-1);
  font-size: var(--font-size-sm-1);
  font-weight: var(--font-weight-regular);
  background-color: transparent;
  padding: 0;
`;
