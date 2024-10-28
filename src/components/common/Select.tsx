import React from 'react';
import styled, { css } from 'styled-components';

interface StyledSelectProps {
  selectStyle?: 'round' | 'square';
  selectSize?: 'sm' | 'md' | 'bg';
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

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => !['selectStyle', 'selectSize'].includes(prop),
})<StyledSelectProps>`
  border: 1px solid var(--color-grey-2);
  padding: 8px 12px;
  color: var(--color-grey-1);
  line-height: 1.2;
  outline: none;
  ${(props) => props.selectStyle && selectStyles[props.selectStyle]}
  ${(props) => props.selectSize && selectSizes[props.selectSize]}
`;

interface SelectProps extends StyledSelectProps {
  options:
    | { value: string | number; label: string }[] // 카테고리용
    | { value: string | number; label: string; category: number }[]; // 커뮤니티용
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  selectStyle = 'square',
  selectSize = 'md',
  disabled = false,
  ...props
}) => (
  <StyledSelect
    selectStyle={selectStyle}
    selectSize={selectSize}
    value={value}
    onChange={onChange}
    {...props}
    disabled={disabled}
  >
    {options.map((option) => (
      <option
        // 옵션에 카테고리가 있으면, 커뮤니티용으로 key 값을 다르게 줘서 고유값 부여
        key={
          'category' in option
            ? `cat-${option.category}-${option.value}`
            : `val-${option.value}`
        }
        value={option.value}
      >
        {option.label}
      </option>
    ))}
  </StyledSelect>
);

export default Select;
