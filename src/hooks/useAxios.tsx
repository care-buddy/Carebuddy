import { useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url: string, onSuccess: () => void) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message || 'sonething went wrong');
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, fetchData };
};

export default useAxios;
