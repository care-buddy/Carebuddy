import { atom } from 'recoil';

// 로그인 상태를 저장할 Atom
const authState = atom({
  key: 'authState',
  default: { isAuthenticated: false, accessToken: null },
});

export default authState;
