import axios from 'axios';

import axiosInstance from '@/utils/asioxInstance';

import { JWT_EXPIRY_TIME } from '@/constants/auth/authConstants';
import authState from '@/recoil/atoms/authState';

// 자동로그인 연장 설정
const handleLoginSuccess = (accessToken) => {
  console.log(
    'handleLoginSuccess called with response:',
    accessToken
  ); // 추가한 부분 - 테스트용

  // const { accessToken } = response.data;

  // 자동로그인 테스트
  // console.log('New access token obtained:', accessToken); // 추가한 부분 - 테스트용

  // accessToken 설정
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  // accessToken이 만료되기 1분 전에 로그인 연장
  // console.log("Setting timeout for silent refresh"); // 추가한 부분 - 테스트용
  // setTimeout(handleSilentRefresh, JWT_EXPIRY_TIME - 60000);
  // setTimeout(handleSilentRefresh, JWT_EXPIRY_TIME - 10000); // 테스트용 시간

  // 로그인 상태일 때만 자동 로그인 연장 설정
  if (authState.isAuthenticated) {
    console.log('로그인 상태', authState);
    // 자동 로그인 연장 시도 - 이 로그가 표시되면 setTimeout이 실행된 것
    console.log('Setting up silent refresh');
    setTimeout(() => {
      console.log('Executing handleSilentRefresh'); // 이 로그가 표시되면 setTimeout이 실행된 것
      handleSilentRefresh();
    }, JWT_EXPIRY_TIME - 10000); // JWT_EXPIRY_TIME - 10000은 20초 후에 실행됨
  }
};

// 자동 로그인 연장
const handleSilentRefresh = async () => {
  console.log('Silent refresh initiated'); // 추가한 부분 - 테스트용
  try {
    const response = await axiosInstance.post(
      'auth/silent-refresh',
      {},
      {
        withCredentials: true,
      }
    );
    console.log('Silent refresh response:', response); //  추가한 부분 - 테스트용
    handleLoginSuccess(response.data.accessToken);
  } catch (error) {
    // 로그인 실패 처리
    console.error('Silent refresh error:', error);
  }
};

export { handleLoginSuccess, handleSilentRefresh };
