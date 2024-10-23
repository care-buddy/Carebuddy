// me API 불러서 유저 상태 업데이트하는 훅

import axiosInstance from '@/utils/axiosInstance';
import { useRecoilState } from 'recoil';
import userState from '@/recoil/atoms/userState';

const useUpdateMe = () => {
  const [, setUser] = useRecoilState(userState);

  const updateMe = async () => {
    try {
      const userResponse = await axiosInstance.get('me');
      setUser(userResponse.data.message);
    } catch (error) {
      console.error('유저업데이트에 실패했습니다.', error);
    }
  };

  return updateMe; // 업데이트 함수를 반환
};

export default useUpdateMe;
