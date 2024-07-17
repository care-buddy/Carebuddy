// 딥다이브에서 라이브러리 사용을 추천하여 일단 사용했지만 나중에 직접 구현 버전으로 바꾸는 것도 고려 - 임시

import { debounce } from 'lodash';

// 디바운싱하여 상태 업데이트 하는 커스텀 훅
const useDebounce = (
  delay: number,
  setStateFunction: (value: string) => void
) =>
  debounce((value: string) => {
    setStateFunction(value);
  }, delay);

export default useDebounce;
