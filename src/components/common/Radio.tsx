import React from 'react';
import styled from 'styled-components';

// 동적 스타일 지정 X 필요 시 생성
// 기본 스타일을 여기서 지정: 기본 스타일 + 동적 스타일
const StyledRadio = styled.input`
  width: var(--font-size-ft-1);
  height: var(--font-size-ft-1);
  appearance: none;
  border-radius: 50%;
  position: relative;
  border: 1px solid var(--color-green-main);
  background: none;
  transition:
    border 0.1s,
    box-shadow 0.1s;
  outline: none;
  cursor: pointer;
  margin-right: 8px;

  &:checked:after {
    content: '';
    display: block;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--color-green-main);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus,
  &:focus-visible {
    border-color: var(--color-green-main);
    box-shadow: 0 0 0 1px var(--color-green-main);
  }
`;

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({
  value,
  checked,
  onChange,
  //   types나 placeholder 등.. 동적으로 나머지 props 가져옴
  ...props
}) => (
  <StyledRadio
    type="radio"
    value={value}
    checked={checked}
    name="radioGroup"
    onChange={onChange}
    {...props}
  />
);

export default Radio;
