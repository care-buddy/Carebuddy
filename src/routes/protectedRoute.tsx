// 로그인한 사용자가 보는 곳
// 로그인하지 않은 경우, 리다이렉트

import loginModalState from '@/recoil/atoms/loginModalState';
import isAuthenticatedState from '@/recoil/selectors/authSelector';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

// children props: component 내부의 모든 것
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [redirect, setRedirect] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);

  if (redirect) {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      return <Navigate to="/" />;
    }
    setRedirect(false);
    setLoginModalOpen(false);
  }

  if (!isAuthenticated) {
    setRedirect(true);
    if (!loginModalOpen) {
      setLoginModalOpen(true);
    }
  }

  return children;
}
