import axios from 'axios';
import { useRecoilState } from 'recoil';
import authState from '@/recoil/atoms/authState';
import { JWT_EXPIRY_TIME } from '@/constants/auth/authConstants';
import axiosInstance from '@/utils/axiosInstance';

const useLogin = () => {
  const [_, setAuth] = useRecoilState(authState);

  // 로그인 성공 후 호출되는 함수
  const handleLoginSuccess = (
    accessToken: string,
    isAuthenticated: boolean
  ) => {
    // Access token을 Axios 헤더에 설정
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // 로그인 상태일 때만 자동 로그인 연장 설정
    if (isAuthenticated) {
      // Access token 만료 10초 전에 자동 로그인 연장 설정
      setTimeout(() => {
        handleSilentRefresh(isAuthenticated);
      }, JWT_EXPIRY_TIME - 10000); // 10초 전에 실행
    }
  };

  // 자동 로그인 연장(accessToken 갱신)
  const handleSilentRefresh = async (isAuthenticated: boolean) => {
    try {
      const response = await axiosInstance.post(
        'auth/silent-refresh',
        {},
        {
          withCredentials: true, // 쿠키와 함께 요청
        }
      );

      // 새로운 accessToken과 refreshToken을 설정
      const { accessToken, refreshToken } = response.data;

      // 새 accessToken을 Axios 헤더에 설정
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // 리프레시 토큰을 쿠키에 저장하
      document.cookie = `refreshToken=${refreshToken}; path=/`;

      // 상태 업데이트
      setAuth(() => ({
        accessToken,
      }));

      if (isAuthenticated) {
        // 새 토큰을 사용하여 자동 로그인 연장 재설정
        handleLoginSuccess(accessToken, isAuthenticated);
      }
    } catch (error) {
      // 로그인 실패 처리: 사용자에게 다시 로그인 요청
      setAuth({
        accessToken: null,
      });
    }
  };

  return { handleSilentRefresh };
};

export default useLogin;
