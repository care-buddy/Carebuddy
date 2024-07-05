// 날짜 formatting 함수(시간 포함)

const formatDateIncludeTime = (rowDate: string) => {
  const date = new Date(rowDate);

    // 날짜 객체 유효성 검사
    if (Number.isNaN(date.getTime())) {
      return 'Invalid Date';
    }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours();
  const minutes = date.getMinutes();

  
  const time = hours === 0 && minutes === 0 ? '' : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  return `${year}-${month}-${day}${time ? ` ${time}` : ''}`;
};

export default formatDateIncludeTime;