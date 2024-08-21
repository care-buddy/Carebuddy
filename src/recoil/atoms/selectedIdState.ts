import { atom } from 'recoil';

// 버디 프로필 카드에서, 선택된 버디의 id를 저장하는 상태
const selectedIdState = atom<string | null>({
  key: 'selectedIdState',
  default: null,
});

export default selectedIdState;
