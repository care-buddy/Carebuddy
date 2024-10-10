import { atom } from 'recoil';

interface AuthState {
  accessToken: string | null;
}

// 로그인 상태를 저장할 Atom
const authState = atom<AuthState>({
  key: 'authState',
  default: {
    accessToken: null,
  },
});

export default authState;
