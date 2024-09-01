import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isAuthenticatedState from '@/recoil/selectors/authSelector';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  if (isAuthenticated) {
    return children; // 로그인 상태라면 자식 컴포넌트를 렌더링
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
