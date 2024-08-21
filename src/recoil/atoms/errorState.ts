import { atom } from 'recoil';

const errorState = atom<Error | null>({
  key: 'errorState',
  default: null,
});

export default errorState;
