import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import Button from '@components/common/Button';
import loadingState from '@/recoil/atoms/loadingState';
import authState from '@/recoil/atoms/authState';
import axiosInstance from '@/utils/axiosInstance';
import validationAlertState from '@/recoil/atoms/validationAlertState';
import ValidationAlert from '@/components/common/ValidationAlert';

import userState from '@/recoil/atoms/userState';

import useUpdateMe from '@/hooks/useUpdateMe';

import { HOMEPAGE } from '@/constants/constants';
import media from '@/utils/media';

interface WriteButtonProps {
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WriteButton: React.FC<WriteButtonProps> = ({ setIsWriteModalOpen }) => {
  const [, setRedirect] = useState(false);
  const [, setLoading] = useRecoilState(loadingState);
  const [, setAuth] = useRecoilState(authState);
  const user = useRecoilValue(userState);
  const [alertState, setAlertState] = useRecoilState(validationAlertState);

  const updateMe = useUpdateMe();

  const handleWriteClick = async () => {
    try {
      // 홈 주소 확인
      const isHomePage =
        window.location.origin === HOMEPAGE && window.location.pathname === '/';
      if (isHomePage) {
        setIsWriteModalOpen(true);
        return;
      }

      const currentUrl = window.location.href; // 현재 URL 가져오기
      const urlParts = currentUrl.split('/'); // URL 경로를 분할하여 마지막 부분(communityId)
      const communityId = urlParts[urlParts.length - 1];

      const isCommunityIdIncluded = user?.communityId?.some(
        (community) => community._id === communityId
      );

      if (!isCommunityIdIncluded) {
        // 가입된 커뮤니티가 아닐 때
        if (
          confirm(
            '게시글 작성을 위해서는 커뮤니티에 가입하셔야합니다. 가입하시겠습니까?'
          )
        ) {
          const response = await axiosInstance.put(
            `users/${user?._id}/joinCommunity`,
            {
              communityId,
            }
          );
          if (response.status === 200) {
            await updateMe();
            setIsWriteModalOpen(true);
            return;
          }
        } else {
          setIsWriteModalOpen(false);
          return;
        }
      }

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
  ${media.mobile} {
    justify-content: flex-end;
    margin-top: 8px;

    > button {
      padding: 8px 12px;
      font-size: var(--font-size-ft-1);
    }
  }
`;

const P = styled.p`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-ft-1);
  margin-right: 8px;

  ${media.mobile} {
    font-size: var(--font-size-sm-1);
  }
`;
