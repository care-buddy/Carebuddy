import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';


interface AuthState {
  accessToken: string | null;
}

// persistAtom 설정
const { persistAtom } = recoilPersist({
  key: 'authState',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined, // localStorage에 저장
});

// 로그인 상태를 저장할 Atom
const authState = atom<AuthState>({
  key: 'authState',
  default: {
    accessToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;
