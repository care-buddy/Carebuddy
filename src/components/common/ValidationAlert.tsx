import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

const fadeInScale = keyframes`
  from {
    opacity: 0.9;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); // 흰색 배경에 투명도 추가
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.1rem 1.6rem 1.6rem;
  border-radius: 0.5rem;
  max-width: 300px;
  min-width: 300px;
  box-shadow: 0 8px 24px hsla(210, 8%, 62%, 0.2);
  text-align: center;

  > p {
    color: var(--color-black-main);
  }
  animation: ${fadeInScale} 0.3s ease-out; /* 애니메이션 추가 */
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  > p {
    color: var(--color-black-main);
    font-size: var(--font-size-md-2);
    font-weight: var(--font-weight-semibold);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-hd-1);
  cursor: pointer;
  margin-left: 10px;
  color: var(--color-black-main);
`;

const ButtonWrapper = styled.div`
  padding-top: 1.5rem;
`;

interface alertProps {
  message: string;
  onClose: () => void;
}

const ValidationAlert: React.FC<alertProps> = ({ message, onClose }) => (
  <Overlay>
    <ModalContainer>
      <Header>
        <p>알림</p>
        <CloseButton onClick={onClose}>x</CloseButton>
      </Header>
      <p>{message}</p>
      <ButtonWrapper>
        <Button
          buttonStyle="middle-round-green"
          buttonSize="fit"
          onClick={onClose}
        >
          확인
        </Button>
      </ButtonWrapper>
    </ModalContainer>
  </Overlay>
);

export default ValidationAlert;
