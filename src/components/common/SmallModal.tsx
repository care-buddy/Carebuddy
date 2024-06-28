import React, { useEffect } from 'react';
import styled from 'styled-components';

interface SmallModalProps {
  onClose: () => void;
  component: React.ReactNode;
}

const SmallModal: React.FC<SmallModalProps> = ({onClose, component}) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 모달 열렸을 때 배경 스크롤 막음

    return () => {
      document.body.style.overflow = 'auto'; // 닫혔을 때 다시 스크롤 가능하게 만듦
    };
  }, []);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {component}
      </ModalContent>
      <p>모달 테스트</p>
    </ModalBackground>
  );
};

export default SmallModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  padding-top: 16vh; 
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 30vw;
  max-height: 64vh;
  background-color: var(--color-white);
  border-radius: 7px;
  border: 1px solid var(--color-grey2);
  border-top: 20px solid #6d987a;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 28px 0;
  box-sizing: border-box;
  align-items: center;
`;
