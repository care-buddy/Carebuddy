import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import { useRecoilState } from 'recoil';
import loadingState from '@/recoil/atoms/loadingState';
import authState from '@/recoil/atoms/authState';
import axiosInstance from '@/utils/axiosInstance';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import ValidationAlert from '../common/ValidationAlert';

interface WriteButtonProps {
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WriteButton: React.FC<WriteButtonProps> = ({ setIsWriteModalOpen }) => {
  const [, setRedirect] = useState(false);
  const [, setLoading] = useRecoilState(loadingState);
  const [, setAuth] = useRecoilState(authState);
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const handleWriteClick = async () => {
    try {
      // 토큰 리프레시 API 호출
      const response = await axiosInstance.post('auth/silent-refresh');
      const { accessToken } = response.data;
      setAuth({
        accessToken,
      });
      setIsWriteModalOpen((prevState) => !prevState);
    } catch (error) {
      console.error('Silent refresh error:', error);
      setRedirect(true);
      setAlertState({
        showAlert: true,
        alertMessage: '로그인 후 이용하실 수 있습니다.',
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <P> 함께 나누고 싶은 이야기가 있나요?</P>
      <Button buttonSize="sm" onClick={handleWriteClick}>
        글 작성하기
      </Button>
      {alertState.showAlert && (
        <ValidationAlert
          message={alertState.alertMessage}
          onClose={() => setAlertState({ showAlert: false, alertMessage: '' })}
        />
      )}
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
