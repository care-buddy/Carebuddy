import React from 'react';
import styled, { css } from 'styled-components';

// 동적 스타일 props
interface StyledInputProps {
  inputSize?: 'mini' | 'sm' | 'md' | 'lg' | 'bg';
  activeOption?: 'active' | 'readOnly';
  borderStyle?: 'round' | 'square';
  inputPadding?: 'default' | 'sm';
  placeholderColor?: 'default' | 'light-grey';
  focusColor?: 'default' | 'green';
}

const inputSizes = {
  mini: css`
    width: 80px;
  `,
  sm: css`
    width: 150px;
  `,
  md: css`
    width: 180px;
  `,
  lg: css`
    width: 210px;
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

const borderStyles = {
  round: css`
    border-radius: 4px;
  `,
  square: css``,
};

const inputPaddings = {
  default: css`
    padding: 5px 10px;
  `,
  sm: css`
    padding: 8px 8px;
  `,
};

const placeholderColors = {
  default: css``,
  'light-grey': css`
    &::placeholder {
      color: var(--color-grey-2);
    }
  `,
};

const focusColors = {
  default: css``,
  green: css`
    &:focus {
      border: 1px solid var(--color-green-main);
    }
  `,
};

// 기본 스타일을 여기서 지정: 기본 스타일 + 동적 스타일
const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'inputSize',
      'activeOption',
      'borderStyle',
      'inputPadding',
      'placeholderColor',
      'focusColor',
    ].includes(prop),
})<StyledInputProps>`
  font-family: 'Pretendard-Regular', sans-serif;
  color: var(--color-black);
  border: 1px solid var(--color-grey-2);
  transition: all 0.3s;

  ${(props) => props.inputSize && inputSizes[props.inputSize]}
  ${(props) => props.activeOption && activeOptions[props.activeOption]}
  ${(props) => props.borderStyle && borderStyles[props.borderStyle]}
  ${(props) => props.inputPadding && inputPaddings[props.inputPadding]}
  ${(props) =>
    props.placeholderColor && placeholderColors[props.placeholderColor]}
    ${(props) => props.focusColor && focusColors[props.focusColor]}
  outline: none;
`;

// 스타일을 확장한 최종 input 컴포넌트의 props
interface InputProps
  extends StyledInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  inputSize = 'md',
  activeOption = 'active',
  borderStyle = 'round',
  inputPadding = 'default',
  placeholderColor = 'default',
  focusColor = 'default',
  //   types나 placeholder 등.. 동적으로 나머지 props 가져옴
  ...props
}) => (
  <StyledInput
    name={name}
    inputSize={inputSize}
    activeOption={activeOption}
    borderStyle={borderStyle}
    inputPadding={inputPadding}
    placeholderColor={placeholderColor}
    focusColor={focusColor}
    {...props}
  />
);

export default Input;
