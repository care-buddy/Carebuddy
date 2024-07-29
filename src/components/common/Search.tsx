import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { LuSearch, LuX } from 'react-icons/lu';

// 스타일을 정의하는 객체
const searchSizes = {
  md: css`
    width: 500px;
    font-size: var(--font-size-md-2);
    padding: 6px 8px;
  `,
  sm: css`
    width: 300px;
    font-size: var(--font-size-sm);
    padding: 4px 8px;
  `,
  xs: css`
    width: 150px;
    font-size: var(--font-size-sm-1);
    padding: 2px 5px;
  `,
};

const searchStyles = {
  round: css`
    border-radius: 30px;
  `,
  square: css``,
};

interface StyledSearchProps {
  searchSize?: 'xs' | 'sm' | 'md';
  searchStyle?: 'round' | 'square';
}

const SearchBox = styled.div<StyledSearchProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  border: 1px solid var(--color-grey-2);
  height: auto;
  ${(props) => props.searchSize && searchSizes[props.searchSize]}
  ${(props) => props.searchStyle && searchStyles[props.searchStyle]}
`;

const StyledInput = styled.input<StyledSearchProps>`
  border: none;
  width: 100%;
  ${(props) => props.searchSize && searchSizes[props.searchSize]}

  &:focus {
    outline: none;
  }
`;

interface SearchProps extends StyledSearchProps {
  initialValue?: string; // 검색창에 보여줄 초기값(쿼리스트링에서 가져옴)
  placeholder?: string;
  onSearchTerm: (value: string) => void; // 검색어 설정
  onSearchState: (value: boolean) => void; // 검색 상태 설정
  searchState: boolean; // 검색 상태
}

const Search: React.FC<SearchProps> = ({
  initialValue = '',
  searchSize = 'md',
  searchStyle = 'round',
  onSearchTerm,
  searchState,
  onSearchState,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // initialValue가 변경될 때 inputValue를 업데이트
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // input value는 실시간 업데이트, 엔터나 돋보니 누르면 검색어 상위컴포넌트로 전송
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (onSearchTerm) {
      onSearchTerm(inputValue);
    }
    if (!searchState) {
      onSearchState(true);
    }
  };

  // x아이콘 클릭 시 & 검색어가 없어지면 검색 중인 상태에서 벗어남
  const handleXIconClick = () => {
    onSearchState(false);
    setInputValue('');
    onSearchTerm('');
  };

  useEffect(() => {
    if (inputValue === '') {
      onSearchState(false);
    }
  }, [inputValue, onSearchState]);

  return (
    <form onSubmit={handleSubmit}>
      <SearchBox searchSize={searchSize} searchStyle={searchStyle}>
        <StyledInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          searchSize={searchSize}
          {...props}
        />
        {searchState && (
          <>
            <StyledXIcon onClick={handleXIconClick} />
            <P>|</P>
          </>
        )}
        <StyledSearchIcon onClick={(e) => handleSubmit(e)} />
      </SearchBox>
    </form>
  );
};

export default Search;

const StyledXIcon = styled(LuX)`
  font-size: var(--font-size-hd-2);
  margin-right: 4px;
  color: var(--color-grey-1);
  cursor: pointer;
`;

const P = styled.p`
  font-size: var(--font-size-hd-2);
  color: var(--color-grey-3);
`;

const StyledSearchIcon = styled(LuSearch)`
  font-size: var(--font-size-hd-2);
  margin: 0 4px;
  color: var(--color-grey-2);
  cursor: pointer;
`;
