// 로그인한 사용자가 보는 곳
// 로그인하지 않은 경우, 리다이렉트

import authState from '@/recoil/atoms/authState';
import loadingState from '@/recoil/atoms/loadingState';
import loginModalState from '@/recoil/atoms/loginModalState';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// children props: component 내부의 모든 것
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [redirect, setRedirect] = useState(false);
  const [, setLoading] = useRecoilState(loadingState);
  const [, setLoginModalOpen] = useRecoilState(loginModalState);
  const [, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // 토큰 리프레시 API 호출
        const response = await axiosInstance.post('auth/silent-refresh');
        const { accessToken } = response.data;
        setAuth({
          accessToken,
        });
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
