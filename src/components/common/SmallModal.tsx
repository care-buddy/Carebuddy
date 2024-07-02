import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

// 버튼 스타일, 사이즈 props
interface StyledSmallModalProps {
  modalPaddingSize?: 'sm' | 'md';
}

const modalPaddingSizes = {
  sm: css`
    padding: 30px 0;
  `,
  md: css`
    padding: 48px 0;
  `,
};

interface SmallModalProps extends StyledSmallModalProps {
  onClose: () => void;
  component: React.ReactNode;
}

const SmallModal: React.FC<SmallModalProps> = ({
  onClose,
  component,
  modalPaddingSize = 'md',
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 모달 열렸을 때 배경 스크롤 막음

    return () => {
      document.body.style.overflow = 'auto'; // 닫혔을 때 다시 스크롤 가능하게 만듦
    };
  }, []);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        modalPaddingSize={modalPaddingSize}
      >
        {component}
      </ModalContent>
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
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div<StyledSmallModalProps>`
  position: relative;
  width: 30vw;
  max-height: 70vh;
  background-color: var(--color-white);
  border-radius: 7px;
  border: 1px solid var(--color-grey2);
  border-top: 20px solid #6d987a;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  align-items: center;

  ${(props) =>
    props.modalPaddingSize && modalPaddingSizes[props.modalPaddingSize]}
`;
