import React from 'react';
import styled from 'styled-components';
import Button from '@components/common/Button';
import media from '@/utils/media';

// 모달 헤더: 타이틀을 포함
const ModalHeaderContainer = styled.header`
  width: 100%;
  /* padding: 10px; */
  /* background-color: #f0f0f0; */
  /* border-bottom: 1px solid #ccc; */
`;

const Title = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-hd-1); //20
  color: var(--color-green-main);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-grey-2);
`;

interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => (
  <ModalHeaderContainer>
    <Title>{children}</Title>
  </ModalHeaderContainer>
);

// 모달 바디
const ModalBodyContainer = styled.div`
  font-size: 1rem;
  padding: 1.25rem;

  ${media.mobile} {
    padding: 1rem 0;
  }
`;

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <ModalBodyContainer>{children}</ModalBodyContainer>
);

// 모달 푸터: 제출, 취소 등 버튼을 포함
const ModalFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  border-top: 1px solid var(--color-grey-2);
  width: 100%;

  ${media.mobile} {
    padding: 10px 0;
  }
`;

const ButtonContainer = styled.div`
  padding: 10px 0 20px 0;
  > button {
    margin-left: 10px;
  }
`;

interface ModalFooterProps {
  onHandleClick?: () => void;
  value: string;
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onHandleClick,
  value,
  onClose,
}) => (
  <ModalFooterContainer>
    <ButtonContainer>
      <Button buttonStyle="square-green" onClick={onHandleClick}>
        {value}
      </Button>
      <Button buttonStyle="square-white" onClick={onClose}>
        취소
      </Button>
    </ButtonContainer>
  </ModalFooterContainer>
);
export { ModalHeader, ModalBody, ModalFooter };
