import { User } from '@/interfaces/index';
import { atom } from 'recoil';

export type UserState = User | null;

// 유저 정보를 저장할 Atom
const userState = atom({
  key: 'userState',
  default: null as UserState,
});

export default userState;