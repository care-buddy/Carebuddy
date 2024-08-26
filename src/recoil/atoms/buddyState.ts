import { atom } from 'recoil';
import { IBuddyProfile } from '@/interfaces';

interface Buddy {
  name: string | null;
  buddies: IBuddyProfile[];
}

// 로그인하면, 여기에 default 값을 설정해준다
// 지금은 diary 페이지에서 세팅해주고 있음: 다이어리 페이지에서 한 번 컴포넌트 마운트 해야 활용 가능
const buddyState = atom<Buddy>({
  key: 'buddyState',
  default: {
    name: null,
    buddies: [],
  },
});

export default buddyState;
