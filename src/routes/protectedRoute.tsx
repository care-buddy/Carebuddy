import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isAuthenticatedState from '@/recoil/selectors/authSelector';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  console.log('isAuthenticated in ProtectedRoute:', isAuthenticated); // 상태 확인

  if (isAuthenticated) {
    console.log('Authenticated: rendering children');
    return children; // 로그인 상태라면 자식 컴포넌트를 렌더링
  }

  alert('로그인한 사용자만 이용할 수 있는 메뉴입니다.');
  console.log('Not authenticated: redirecting');
  return <Navigate to="/" />;
};

export default ProtectedRoute;
