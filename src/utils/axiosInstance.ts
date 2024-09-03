import axios from 'axios';
import { API_URL } from '@/constants/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  // withCredentials : true, // refreshToken cookie를 주고받기 위해 설정
});

export default axiosInstance;