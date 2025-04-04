import React, { useEffect } from 'react';
import styled from 'styled-components';
import media from '@/utils/media';
import { ModalHeader, ModalBody, ModalFooter } from './ModalComponents';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 50%;
  max-height: 80vh;
  background-color: var(--color-white);
  border-radius: 7px;
  border: 1px solid var(--color-grey2);
  border-top: 20px solid #6d987a;
  padding: 1.25rem 3.625rem;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow-y: auto;
  overflow-x: hidden;

  ${media.tablet} {
    width: 80%;
    max-width: 800px;
  }

  ${media.mobile} {
    width: 90%;
    max-width: 600px;
    padding: 1.25rem 1.5rem;
  }
`;

interface BigModalProps {
  onClose: () => void;
  onHandleClick?: () => void;
  component: React.ReactNode;
  title: string;
  value: string;
}

const BigModal: React.FC<BigModalProps> = ({
  title,
  value,
  onClose,
  component: Component,
  onHandleClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 모달 열렸을 때 배경 스크롤 막음

    return () => {
      document.body.style.overflow = 'auto'; // 닫혔을 때 다시 스크롤 가능하게 만듦
    };
  }, []);

  return (
    // 모달 외부 클릭 시, 모달을 닫음
    <ModalBackground onMouseDown={onClose}>
      <ModalContent onMouseDown={(e) => e.stopPropagation()}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{Component}</ModalBody>
        <ModalFooter
          onHandleClick={onHandleClick}
          value={value}
          onClose={onClose}
        />
      </ModalContent>
    </ModalBackground>
  );
};

export default BigModal;
