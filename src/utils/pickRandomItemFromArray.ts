// 제네릭을 사용하여 배열에서 무작위 요소를 고르는 함수
const pickRandomItemFromArray = <T>(array: T[], count: number): T[] => {
  const shuffledArray = [...array];

  // 배열을 무작위로 섞기
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
};

export default pickRandomItemFromArray;
