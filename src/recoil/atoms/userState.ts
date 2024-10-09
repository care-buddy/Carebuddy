import { User } from '@/interfaces/index';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type UserState = User | null;

// persistAtom 설정
const { persistAtom } = recoilPersist({
  key: 'userState',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined, // localStorage에 저장
});

// 유저 정보를 저장할 Atom
const userState = atom<UserState>({
  key: 'userState', 
  default: null, 
  effects_UNSTABLE: [persistAtom],
});

export default userState;
