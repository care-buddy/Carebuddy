import React from 'react';
import styled, { css } from 'styled-components';

interface StyledTextAreaProps {
  size?: 'sm' | 'md' | 'lg';
}

const textAreaSizes = {
  sm: css`
    width: 200px;
    height: 50px;
  `,
  md: css`
    width: 350px;
    height: 100px;
  `,
  lg: css`
    width: 600px;
    height: 150px;
  `,
};

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  font-family: 'Pretendard-Regular', sans-serif;
  color: var(--color-black);
  padding: 5px 10px;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  resize: none;
  outline: none;
  ${(props) => props.size && textAreaSizes[props.size]}// 박스 크기 prop
`;

interface TextAreaProps
  extends StyledTextAreaProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  size = 'md',
  placeholder,
  value,
  onChange,
  ...props
}) => (
  <StyledTextArea
    size={size}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...props}
  />
);

export default TextArea;
