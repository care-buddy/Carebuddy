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
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  selectStyle = 'square',
  selectSize = 'md',
  ...props
}) => (
  <StyledSelect
    selectStyle={selectStyle}
    selectSize={selectSize}
    value={value}
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
