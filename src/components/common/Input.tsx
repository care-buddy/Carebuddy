import React from 'react';
import styled, { css } from 'styled-components';

// 동적 스타일 props
interface StyledInputProps {
  inputSize?: 'sm' | 'md' | 'bg';
  activeOption?: 'active' | 'readOnly';
}

const inputSizes = {
  sm: css`
    width: 150px;
  `,
  md: css`
    width: 180px;
  `,
  bg: css`
    width: 100%;
  `,
};

const activeOptions = {
  active: css``,
  readOnly: css`
    background-color: var(--color-grey-3);
    cursor: not-allowed;
    pointer-events: none;
  `,
};

// 기본 스타일을 여기서 지정: 기본 스타일 + 동적 스타일
const StyledInput = styled.input<StyledInputProps>`
  font-family: 'Pretendard-Regular', sans-serif;
  color: var(--color-black);
  padding: 5px 10px;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  ${(props) => props.inputSize && inputSizes[props.inputSize]}
  ${(props) => props.activeOption && activeOptions[props.activeOption]}
  outline: none;
`;

// 스타일을 확장한 최종 input 컴포넌트의 props
interface InputProps extends StyledInputProps, React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({
  inputSize = 'md',
  activeOption = 'active',
  //   types나 placeholder 등.. 동적으로 나머지 props 가져옴
  ...props
}) => (
  <StyledInput
    inputSize={inputSize}
    activeOption={activeOption}
    {...props}
  />
);

export default Input;
