import React from 'react';
import styled, { css } from 'styled-components';
// 예쁜 select를 React에서 다루기 위해서 react-select라는 라이브러리 사용을 고려해볼 수 있음!

interface StyledSelectProps {
  selectStyle?: 'round' | 'square';
  selectSize?: 'sm' | 'md' | 'bg';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const selectStyles = {
  round: css`
    border-radius: 30px;
  `,
  square: css`
    border-radius: none;
  `,
};

const selectSizes = {
  //  md 외 사이즈 필요 시 조정해서 사용하세요
  sm: css`
    width: 100px;
  `,
  md: css`
    width: 150px;
  `,
  bg: css`
    width: 200px;
  `,
};

// 기본 스타일 변경 필요 시 공유 후 분리 or ...props로 사용
const StyledSelect = styled.select<StyledSelectProps>`
  border: 1px solid var(--color-grey-2);
  padding: 8px 12px;
  color: var(--color-grey-1);
  line-height: 1.2;
  ${(props) => props.selectStyle && selectStyles[props.selectStyle]}
  ${(props) => props.selectSize && selectSizes[props.selectSize]}
`;

interface SelectProps extends StyledSelectProps {
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  selectStyle = 'square',
  selectSize = 'md',
  ...props
}) => (
  <StyledSelect
    selectStyle={selectStyle}
    selectSize={selectSize}
    onChange={onChange}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </StyledSelect>
);

export default Select;