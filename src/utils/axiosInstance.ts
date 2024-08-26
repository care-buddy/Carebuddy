import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // 기본 URL 설정, 사용시 '/endpoint' 로 호출하면 http://localhost:3003/api/endpoint로 호출합니다
  baseURL: 'http://localhost:3003/api',
  timeout: 10000, // 타임아웃 설정 (ms)
});

export default axiosInstance;
