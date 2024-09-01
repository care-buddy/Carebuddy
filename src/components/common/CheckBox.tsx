import React from 'react';
import styled, { css } from 'styled-components';

// 체크박스 텍스트 컬러 props
interface StyledCheckBoxProps {
  textColor?: 'grey' | 'black';
}

const textColors = {
  grey: css`
    color: var(--color-grey-1);
  `,
  black: css`
    color: var(--color-black);
  `,
};

interface CheckBoxProps extends StyledCheckBoxProps {
  value: string;
  checked: boolean;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  checked = false,
  text,
  onChange,
  textColor = 'grey',
}) => (
  <Label htmlFor={value} className="chk_box">
    <Input type="checkbox" id={value} checked={checked} onChange={onChange} />
    <TextContainer>
      <Span className={checked ? 'on' : ''} />
      <Text textColor={textColor}>{text}</Text>
    </TextContainer>
  </Label>
);

export default CheckBox;

const Label = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-grey-2);
  position: relative;
  margin-right: 4px;

  &.on {
    background-color: var(--color-green-main);
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      width: 6px;
      height: 9px;
      border: solid var(--color-white);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      position: absolute;
      top: 0px;
    }
  }
`;

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => !['textColor'].includes(prop),
})<StyledCheckBoxProps>`
  margin: 0;
  font-size: var(--font-size-ft-1);
  ${(props) => props.textColor && textColors[props.textColor]}
  font-weight: var(--font-weight-regular);
`;
