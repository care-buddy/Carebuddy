import React from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';

interface WriteButtonProps {
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WriteButton: React.FC<WriteButtonProps> = ({ setIsWriteModalOpen }) => {
  const handleWriteClick = () => {
    setIsWriteModalOpen((prevState) => !prevState);
  };

  return (
    <Container>
      <P> 함께 나누고 싶은 이야기가 있나요?</P>
      <Button buttonSize="sm" onClick={handleWriteClick}>
        글 작성하기
      </Button>
    </Container>
  );
};

export default WriteButton;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const P = styled.p`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-ft-1);
  margin-right: 8px;
`;
