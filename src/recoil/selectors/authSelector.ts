import { selector } from 'recoil';
import authState from '../atoms/authState';

const isAuthenticatedState = selector<boolean>({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const auth = get(authState);
    return !!auth.accessToken;
  },
});

export default isAuthenticatedState;
