import React, { useState, useRef, useEffect } from 'react';

import styled, { css } from 'styled-components';
import {
  LuMoreHorizontal,
  LuMoreVertical,
  LuPencil,
  LuTrash2,
} from 'react-icons/lu';

interface StyledActionButtonProps {
  buttonBorder: 'border-solid' | 'border-none';
}

const buttonBorders = {
  'border-solid': css`
    border: var(--color-grey-2) solid 1px;
  `,
  'border-none': css`
    border: none;
  `,
};

const StyledActionButton = styled.button<StyledActionButtonProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--color-grey-2);
  height: 35px;
  width: 35px;
  margin-left: 10px;
  position: relative;
  ${(props) => props.buttonBorder && buttonBorders[props.buttonBorder]};
`;

const StyledIconHorizontal = styled(LuMoreHorizontal)`
  font-size: 24px;
`;

const StyledIconVertical = styled(LuMoreVertical)`
  font-size: 24px;
`;

const OptionButtons = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 100%;
  border: var(--color-grey-2) 1px solid;
  background-color: var(--color-white);

  p {
    color: var(--color-grey-1);
    display: inline-block;
    width: 50px;
  }
`;

const OptionItemEdit = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: var(--color-grey-1);
  /* 임시 색상 */
  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const OptionItemDelete = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: var(--color-red);

  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const Hr = styled.hr`
  border: 0;
  border-top: 0.5px solid var(--color-grey-2);
  width: 100%;
  margin: 0 0;
`;

const Icon = styled.div`
  > svg {
    height: 100%;
  }
`;

interface ActionButtonProps extends StyledActionButtonProps {
  direction: string;
  onEdit?: () => void; // 수정 버튼 클릭 이벤트 핸들러
  onDelete?: () => void; // 삭제 버튼 클릭 이벤트 핸들러
}

const ActionButton: React.FC<ActionButtonProps> = ({
  buttonBorder,
  direction,
  onEdit,
  onDelete,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsClicked(false);
    }
  };
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(); // 수정 버튼 클릭 이벤트 핸들러 호출
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(); // 삭제 버튼 클릭 이벤트 핸들러 호출
    }
  };

  useEffect(() => {
    //  mousedown 이벤트는 버블링을 지원하지 않아, 상위 요소에서 이 공통 컴포넌트를 사용 시 클릭 이벤트를 감지할 수 없기 때문에,
    //  버블링을 지원하는 click 이벤트를 사용합니다
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <StyledActionButton
      buttonBorder={buttonBorder}
      onClick={handleClick}
      ref={buttonRef}
    >
      {direction === 'vertical' ? (
        <StyledIconVertical />
      ) : (
        <StyledIconHorizontal />
      )}
      {isClicked && (
        <OptionButtons>
          <OptionItemEdit onClick={handleEditClick}>
            <p>수정</p>
            <Icon>
              <LuPencil />
            </Icon>
          </OptionItemEdit>
          <Hr />
          <OptionItemDelete onClick={handleDeleteClick}>
            <p>삭제</p>
            <Icon>
              <LuTrash2 />
            </Icon>
          </OptionItemDelete>
        </OptionButtons>
      )}
    </StyledActionButton>
  );
};

export default ActionButton;
