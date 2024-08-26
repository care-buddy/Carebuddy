import axios from 'axios';
import { useRecoilState } from 'recoil';
import authState from '@/recoil/atoms/authState';
import { JWT_EXPIRY_TIME } from '@/constants/auth/authConstants';
import axiosInstance from '@/utils/axiosInstance';

const useLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);

  // 로그인 성공 후 호출되는 함수
  const handleLoginSuccess = (accessToken) => {
    console.log('handleLoginSuccess called with response:', accessToken);

    // Access token을 Axios 헤더에 설정
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // 로그인 상태일 때만 자동 로그인 연장 설정
    if (auth.isAuthenticated) {
      console.log('로그인 상태', auth);
      console.log('Setting up silent refresh');

      // Access token 만료 10초 전에 자동 로그인 연장 설정
      setTimeout(() => {
        console.log('Executing handleSilentRefresh');
        handleSilentRefresh();
      }, JWT_EXPIRY_TIME - 10000); // 10초 전에 실행
    }
  };

  // 자동 로그인 연장
  const handleSilentRefresh = async () => {
    console.log('Silent refresh initiated');
    try {
      const response = await axiosInstance.post(
        'auth/silent-refresh',
        {},
        {
          withCredentials: true, // 쿠키와 함께 요청
        }
      );
      console.log('Silent refresh response:', response);

      // 새로운 accessToken과 refreshToken을 설정
      const { accessToken, refreshToken } = response.data;

      // 새 accessToken을 Axios 헤더에 설정
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // 리프레시 토큰을 쿠키에 저장하거나 클라이언트에서 사용
      // 예를 들어, 쿠키에 저장하는 방법 (다음 코드는 서버와 클라이언트 모두에서 접근 가능해야 함)
      document.cookie = `refreshToken=${refreshToken}; path=/`;

      // 상태 업데이트
      setAuth(() => ({
        isAuthenticated: true,
      }));

      // 새 토큰을 사용하여 자동 로그인 연장 재설정
      handleLoginSuccess(accessToken);
    } catch (error) {
      console.error('Silent refresh error:', error);
      // 로그인 실패 처리: 사용자에게 다시 로그인 요청
      setAuth({
        isAuthenticated: false,
      });
      // window.location.href = '/login'; // 로그인 페이지로 리디렉션
    }
  };

  return { handleSilentRefresh };
};

export default useLogin;
