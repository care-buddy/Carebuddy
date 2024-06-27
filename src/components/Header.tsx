import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '@assets/carebuddyLogo.png';
import Dropdown from './Dropdown';

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background-color: white;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  /* align-items: center; */
  height: 100%;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-decoration: none;
  img {
    max-height: 60px;
    max-width: 120px;
  }
`;

const Menu = styled.nav`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  gap: 6rem;
`;

const MenuItem = styled(NavLink)`
  z-index: 1;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  color: var(--color-black-main);
  font-weight: var(--font-weight-bold);
  padding: 10px 16px;
  padding-top: 44px;
  transition:
    color 0.3s ease,
    padding-top 0.3s ease;
  &:hover {
    color: var(--color-green-main);
    padding-top: 48px;
  }
  /* NavLink의 to props와 경로가 일치하면 active 클래스가 활성화 */
  &.active {
    transition:
      color 0.3s ease,
      padding-top 0.3s ease;
    border-bottom: 3px solid var(--color-green-main);
  }
`;

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const fadeIn = keyframes`
  from {
    opacity: 1;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* 드롭다운 */
const DropdownContainer = styled.div`
  z-index: 2000;
  position: absolute;
  top: calc(100%);
  left: 0;
  display: none;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  ${MenuItem}:hover & {
    display: block;
  }
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // 드롭다운 메뉴 클릭 시, 드롭다운 메뉴가 사라지도록 하는 함수
  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  // 임시
  const InfoMenuItems = [
    { to: '/hosInfo', label: '병원 검색' },
    { to: '/pharInfo', label: '약국 검색' },
  ];

  const CommunityMenuItems = [
    { to: '/community', label: '커뮤니티' },
    { to: '/post', label: '포스트' },
  ];

  return (
    <Wrapper>
      <Content>
        <Logo to="/">
          <img src={logo} alt="Logo" />
        </Logo>
        <Menu>
          <MenuItem
            onClick={handleLinkClick}
            onMouseEnter={() => setDropdownVisible(true)}
            to="/community-feed"
          >
            커뮤니티
            {dropdownVisible && (
              <DropdownContainer>
                <Dropdown
                  subMenuItems={CommunityMenuItems}
                  onLinkClick={handleLinkClick}
                />
              </DropdownContainer>
            )}
          </MenuItem>
          <MenuItem to="/diary">건강관리</MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            onMouseEnter={() => setDropdownVisible(true)}
            to="/hosInfo"
          >
            정보
            {dropdownVisible && (
              <DropdownContainer>
                <Dropdown
                  subMenuItems={InfoMenuItems}
                  onLinkClick={handleLinkClick}
                />
              </DropdownContainer>
            )}
          </MenuItem>
        </Menu>
        <Notification>
          라우팅용 임시버튼들
          <MenuItem to="/login-router">로그인</MenuItem>
          <MenuItem to="/mypage">마이페이지</MenuItem>
          <MenuItem to="/pharInfo">약국정보</MenuItem>
        </Notification>
      </Content>
    </Wrapper>
  );
};
export default Header;
