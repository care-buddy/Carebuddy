import axios from 'axios';
import { API_URL } from '@/constants/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  // withCredentials : true, // refreshToken cookie를 주고받기 위해 설정
});

axiosInstance.interceptors.response.use(
  (response) =>
    // 요청이 성공하면 응답을 반환합니다
    response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // 401 오류가 발생한 경우, 로그인 모달을 열고 리다이렉
      // 여기서 처리하는게 아닌, 컴포넌트에서 처리가 필요
      // 이 곳에서는 공통 에러 핸들링을 시도해보면 좋을 듯
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
