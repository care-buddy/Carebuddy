// 로그인한 사용자가 보는 곳
// 로그인하지 않은 경우, 리다이렉트

import authState from '@/recoil/atoms/authState';
import loadingState from '@/recoil/atoms/loadingState';
import loginModalState from '@/recoil/atoms/loginModalState';
import isAuthenticatedState from '@/recoil/selectors/authSelector';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

// children props: component 내부의 모든 것
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useRecoilValue(authState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [, setLoginModalOpen] = useRecoilState(loginModalState);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // 토큰 리프레시 API 호출
        const response = await axiosInstance.post(
          'auth/silent-refresh',
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        // 새 accessToken을 저장
        localStorage.setItem('accessToken', accessToken);
      } catch (error) {
        console.error('Silent refresh error:', error);

        setRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (redirect) {
    setLoginModalOpen(true);
    return <Navigate to="/" />;
  }
  return children;
}
