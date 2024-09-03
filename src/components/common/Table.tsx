import React from 'react';
import styled from 'styled-components';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10% 0;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  max-width: 80%;
  min-width: 880px;

  th:first-child {
    border-top-left-radius: 6px;
  }

  th:last-child {
    border-top-right-radius: 6px;
  }

  th,
  td {
    padding: 12px;
    min-width: 200px;

    border-bottom: 1px solid var(--color-grey-1);

    &.telephone {
      min-width: 200px;
      max-width: 200px;
    }

    &.address {
      min-width: 350px;
      max-width: 350px;
      text-align: start;
      padding-left: 20px;
    }

    &.name {
      min-width: 250px;
      max-width: 250px;
    }
  }

  th {
    background: var(--color-green-main);
    color: var(--color-white);
    font-weight: var(--font-weight-medium);
  }

  tr:hover {
    background: var(--color-beige-sub);
  }
`;

const StyledPagination = styled(Pagination)`
  margin-top: 20px;
  min-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;

  .rc-pagination-item {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    margin-right: 8px;
    text-align: center;
    list-style: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .rc-pagination-next {
    margin-left: 16px;
  }
  .rc-pagination-prev {
    margin-right: 24px;
  }

  .rc-pagination-item-link {
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
  }

  .rc-pagination-item-active,
  .rc-pagination-item:hover a,
  .rc-pagination-item:hover,
  .rc-pagination-item-link:hover {
    border-color: var(--color-green-main);
  }

  .rc-pagination-item-active a,
  .rc-pagination-item:hover a {
    color: var(--color-green-main);
  }
`;

// 임시 컴포넌트, 실제 사용 시 수정
const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

interface TableProps {
  headers: { value: string; label: string }[]; // 테이블 헤더를 받는 props
  data: { [key: string]: string }[];
  //   임시 props
  isLoading: boolean;
  isError: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPagination: boolean; // 페이징 컴포넌트를 표시할지 여부를 결정하는 props
}

const TableList: React.FC<TableProps> = ({
  headers,
  data,
  isLoading,
  isError,
  currentPage,
  totalPages,
  onPageChange,
  hasPagination,
}) => {
  const renderLoading = () => (
    <tr>
      <td colSpan={headers.length}>
        <LoadingIndicator>Loading...</LoadingIndicator>
      </td>
    </tr>
  );

  const renderError = () => (
    <tr>
      <td colSpan={headers.length}>
        <ErrorMessage>
          데이터를 불러오는 데 오류가 발생했습니다. 다시 시도해주세요.
        </ErrorMessage>
      </td>
    </tr>
  );

  const renderNoResults = () => (
    <tr>
      <td colSpan={headers.length}>검색된 데이터가 없습니다.</td>
    </tr>
  );

  const renderResults = () =>
    data.map((row) => (
      <tr key={row.id}>
        {headers.map((header) => {
          let cellValue = row[header.value];

          if (
            header.value === 'name' &&
            typeof cellValue === 'string' &&
            cellValue.length >= 20
          ) {
            const parenIndex = cellValue.indexOf('(');
            if (parenIndex !== -1) {
              cellValue = cellValue.slice(0, parenIndex).trim(); // '(' 이전의 문자열만 남김
            }

            const parenIndexSecond = cellValue.indexOf('&');
            if (parenIndexSecond !== -1) {
              cellValue = cellValue.slice(0, parenIndexSecond).trim(); // '(' 이전의 문자열만 남김
            }
          }

          if (header.value === 'address' && typeof cellValue === 'string') {
            const words = cellValue.split(' '); // 공백을 기준으로 문자열을 분할
            let trimmedValue = words.slice(0, 5).join(' '); // 앞의 세 단어만 결합

            // 마지막 단어에 쉼표가 있을 경우 제거
            if (trimmedValue.endsWith(',')) {
              trimmedValue = trimmedValue.slice(0, -1); // 마지막 쉼표 제거
            }

            // 마지막 단어가 '('로 시작하고 ')'로 끝나지 않으면 ')' 추가
            const lastWord = trimmedValue.split(' ').slice(-1)[0]; // 마지막 단어 추출
            if (lastWord.startsWith('(') && !lastWord.endsWith(')')) {
              trimmedValue += ')'; // ')'를 문자열 끝에 추가
            }

            cellValue = trimmedValue;
          }

          if (header.value === 'telephone' && typeof cellValue === 'string') {
            // 공백일 경우 '-'로 대체
            if (cellValue.trim() === '' || null) {
              cellValue = '-';
            } else {
              // ')' 또는 ') '를 '-'로 대체
              cellValue = cellValue.replace(/\)\s?/g, '-');
            }
          }

          return (
            <td className={header.value} key={`${row.id}-${header.value}`}>
              {cellValue}
            </td>
          );
        })}
      </tr>
    ));

  // 조건문이 복잡하므로, 함수로 분리
  const renderTableBody = () => {
    if (isLoading) {
      return renderLoading();
    }
    if (isError) {
      return renderError();
    }
    if (data.length === 0) {
      return renderNoResults();
    }
    return renderResults();
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            {/* props로 받은 헤더 정보를 동적으로 생성 */}
            {headers.map((header) => (
              <th key={header.value}>{header.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>{renderTableBody()}</tbody>
      </Table>
      {hasPagination && (
        <StyledPagination
          current={currentPage}
          total={totalPages * 10}
          onChange={onPageChange}
          locale={{
            prev_page: '이전 페이지',
            next_page: '다음 페이지',
          }}
        />
      )}
    </Container>
  );
};
export default TableList;
