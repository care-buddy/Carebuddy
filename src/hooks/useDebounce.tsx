// 디바운싱하여 상태 업데이트 하는 커스텀 훅

// 디바운싱 함수
function debounce(callback: (value: string) => void, delay: number) {
  let timer: number | undefined;
  return (...args: string[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay, ...args);
  };
}

// 훅
const useDebounce = (
  delay: number,
  setStateFunction: (value: string) => void
) =>
  debounce((value: string) => {
    setStateFunction(value);
  }, delay);

export default useDebounce;