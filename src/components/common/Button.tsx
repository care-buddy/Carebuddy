import React from 'react';
import styled, { css } from 'styled-components';

// 버튼 스타일, 사이즈 props
interface StyledButtonProps {
  buttonStyle?:
    | 'round-green'
    | 'square-green'
    | 'square-white'
    | 'link'
    | 'grey';
  buttonSize?: 'sm' | 'md' | 'lg';
}

const buttonStyles = {
  'round-green': css`
    border-radius: 20px;
    background-color: var(--color-green-main);
    color: white;
    transition: all 0.5s;
    &:hover {
      background-color: #567760;
    }
  `,
  'square-green': css`
    border-radius: 0;
    background-color: var(--color-green-main);
    color: white;
    border: solid 1px var(--color-green-main);
    transition: all 0.5s;
    &:hover {
      background-color: #567760;
    }
  `,
  'square-white': css`
    border-radius: 0;
    background-color: transparent;
    color: black;
    border: solid 1px var(--color-grey-2);
  `,
  link: css`
    margin-bottom: 10px;
    padding: 0 0 1px 0;
    border: none;
    border-bottom: solid 1px;
    background-color: transparent;
    font-size: var(--font-size-ft-1);
    font-weight: var(--font-weight-regular);
    cursor: pointer;
  `,

  grey: css`
    font-size: var(--font-size-ft-1);
    color: var(--color-grey-1);
    font-weight: var(--font-weight-regular);
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  `,
};

const buttonSizes = {
  sm: css`
    font-size: var(--font-size-ft-1);
  `,
  md: css`
    font-size: var(--font-size-md-1);
  `,
  lg: css`
    font-size: var(--font-size-hd-1);
  `,
};

// 정의된 스타일들을 props로 받아서 스타일링될 버튼 컴포넌트
const StyledButton = styled.button<StyledButtonProps>`
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  transition: all 0.5s;
  ${(props) => props.buttonStyle && buttonStyles[props.buttonStyle]}
  ${(props) => props.buttonSize && buttonSizes[props.buttonSize]}
`;

// 스타일을 확장한 최종 버튼 컴포넌트의 props
interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonStyle = 'round-green',
  buttonSize = 'md',
  onClick,
  ...props
}) => (
  <StyledButton
    buttonStyle={buttonStyle}
    buttonSize={buttonSize}
    onClick={onClick}
    {...props}
  >
    {children}
  </StyledButton>
);

export default Button;
