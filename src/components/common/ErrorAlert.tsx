import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import errorState from '@/recoil/atoms/errorState';
import React from 'react';
import Button from './Button';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
`;

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  color: var(--color-black-main);
  border-radius: 4px;
  margin: 2rem 0;
  border: none;
`;

const Heading = styled.h1`
  margin: 0;
`;

const ErrorAlert: React.FC = () => {
  const error = useRecoilValue(errorState);
  const resetError = useResetRecoilState(errorState);

  if (!error) return null;

  return (
    <Overlay>
      <AlertContainer>
        <Heading>
          정보를 불러오는 데 오류가 발생했습니다. 새로고침 및 나중에 다시
          시도해주세요!(문구 수정 필요)
        </Heading>
        <Heading>Error: {error.message}</Heading>

        <Button buttonStyle="square-green" onClick={resetError}>
          확인
        </Button>
      </AlertContainer>
    </Overlay>
  );
};

export default ErrorAlert;
