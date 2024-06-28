import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reset from 'styled-reset';
import ProtectedRoute from '@/routes/protectedRoute';
import Layout from '@/components/Layout';
import {
  Home,
  CommunityFeed,
  Post,
  Community,
  Diary,
  Mypage,
  Userpage,
  HosInfo,
  PharInfo
} from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    // 로그인 유저만 접근
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'community-feed', element: <CommunityFeed /> },
      { path: 'post', element: <Post /> },
      { path: 'community', element: <Community /> },
      { path: 'diary', element: <Diary /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'userpage', element: <Userpage /> },
      { path: 'hosInfo', element: <HosInfo /> },
      { path: 'pharInfo', element: <PharInfo /> },
    ],
  },
]);

// 전역 공통 스타일
const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --font-size-sm-1: 0.75rem; // 12
    --font-size-ft-1: 0.875rem; // 14

    --font-size-md-1: 1rem; // 16
    --font-size-md-2: 1.125rem; // 18

    --font-size-hd-1: 1.25rem; // 20
    --font-size-hd-2: 1.375rem; // 22

    --font-size-lg-1: 1.625rem; // 26
    --font-size-lg-2: 2rem; // 32
    --font-size-lg-3: 2.25rem; 
    
    /* h1,h2: bold, h3~h5: semibold, h6: medium 
      p: regular and bold
      buttons and labels: semibold */

    --font-weight-extrabold: 900;
    --font-weight-bold: 700;
    --font-weight-semibold: 600;
    --font-weight-medium: 500; 
    --font-weight-regular: 400; 

    --color-green-main: #6D987A;
    --color-green-sub-1: #98B99C;
    --color-green-sub-2: #E0EAE1;
    --color-beige-main: #EEEDE5;
    --color-beige-sub: #F7F6F2;
    --color-red-main: #E13C45;
    --color-black-main: #343434;
    --color-grey-1: #7D7D7D;
    --color-grey-2: #CECECE;
    --color-grey-3: #f0f0f0;
    --color-white: #ffffff;
    --color-black: #343434;
    --color-red: #E13C45;
    --color-blue: #0069e4;

    --swiper-pagination-color: var(--color-green-main);
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

    *, *::before, *::after { 
    font-family: 'Pretendard-Regular', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, input, #root {
    width: 100%;
    height: auto;
    font-family: 'Pretendard-Regular', sans-serif;
    margin: 0;
    padding: 0;
    color:#343434;
    white-space: nowrap;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  /* height: 100vh;
  display: flex;
  justify-content: center; */
`;

const App: React.FC = () => (
  <Wrapper>
    <GlobalStyles />
    <RouterProvider router={router} />
  </Wrapper>
);

export default App;
