// 로그인한 사용자가 보는 곳
// 로그인하지 않은 경우, 리다이렉트

import React from "react";
import { Navigate } from "react-router-dom";

// children props: component 내부의 모든 것
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 유저가 로그인했는지 확인: 아무 값이나 넣어서 로그인한 유저로 가정합니다
  const user = "login";
  // 로그인 유저가 아닐 경우 이후 구현할 로그인 페이지로 리다이렉트합니다.
  if (user === null) {
    return <Navigate to="/" />;
  }
  return children;
}

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import isAuthenticatedState from '@/recoil/selectors/authSelector';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = useRecoilValue(isAuthenticatedState);

//   if (isAuthenticated) {
//     return children; // 로그인 상태라면 자식 컴포넌트를 렌더링
//   }

//   return <Navigate to="/" />;
// };

// export default ProtectedRoute;
