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
  width: 80%;

  th:first-child {
    border-top-left-radius: 6px;
  }

  th:last-child {
    border-top-right-radius: 6px;
  }

  th,
  td {
    padding: 12px;
    width: 200px;

    border-bottom: 1px solid var(--color-grey-1);
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

  /* .rc-pagination-item-disabled {
    border-color: #d9d9d9;
  }

  .rc-pagination-item-disabled a {
    color: #d9d9d9;
  } */
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
  headers: string[]; // 테이블 헤더를 받는 props
  data: { [key: string]: string }[];
  //   임시 props
  isLoading: boolean;
  isError: boolean;
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
  // console.log(data); // 테이블에 렌더링 될 데이터 배열 확인용 로그

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
        {headers.map((header) => (
          <td key={`${row.id}-${header}`}>{row[header]}</td>
        ))}
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
              <th key={header}>{header}</th>
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
