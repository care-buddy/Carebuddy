import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const DropdownMenu = styled.ul`
  list-style-type: none;
  border: 1px solid var(--color-grey-3);
  margin: 0;
  padding: 0;
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 12px 16px;
  border-bottom: 2px solid var(--color-grey-3);
  text-decoration: none;
  cursor: pointer;
  color: var(--color-black-main);
  font-weight: var(--font-weight-bold);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-grey-3);
  }

  &.active {
    color: var(--color-green-main);
  }
`;

interface MenuItem {
  to: string;
  label: string;
}

interface DropdownProps {
  subMenuItems: MenuItem[];
  onLinkClick: () => void;
}

// a 태그를 중첩하면 안되는 문제 해결이 필요, 경고가 발생할 수 있습니다
const Dropdown: React.FC<DropdownProps> = ({ subMenuItems, onLinkClick }) => (
  <DropdownMenu>
    {subMenuItems.map((item) => (
      <DropdownItem key={item.to} to={item.to} onClick={onLinkClick}>
        {item.label}
      </DropdownItem>
    ))}
  </DropdownMenu>
);

export default Dropdown;
