import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { useRecoilState } from 'recoil';
import userState from '@/recoil/atoms/userState';
import authState from '@/recoil/atoms/authState';

const useLogout = () => {
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  // 로그아웃
  const handleLogout = async () => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
    };

    try {
      await axiosInstance.delete('auth/logout', {
        data: { email: user?.email },
      });
      navigate('/');

      deleteCookie('refreshToken'); // 리프레시 토큰 쿠키 이름에 맞게 변경

      setAuth({
        accessToken: null,
      });

      setUser(null);
    } catch (error) {
      console.error(error); // 임시. 나중에 변경
    }
  };

  return { handleLogout };
};

export default useLogout;
