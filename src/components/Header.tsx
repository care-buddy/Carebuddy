import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '@assets/carebuddyLogo.png';
import { LuBell, LuUser2 } from 'react-icons/lu';

import SmallModal from '@/components/common/SmallModal';
import Login from '@/components/Login/Login';
import Dropdown from './Dropdown';
import Button from './common/Button';
import Notification from './Notification';

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

const NotificationWrapper = styled.div`
  display: flex;
  /* position: relative; */
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

/* 임시 알림 구역: 수정필요! */
const NotificationIcon = styled.div`
  position: relative;
  cursor: default;
  padding: 44px 16px 10px 16px;
  > svg,
  a > svg {
    width: 22px;
    height: 22px;
    color: var(--color-black-main);
    cursor: pointer;
  }
  > button {
    position: absolute;
    padding-right: 16px;

    right: 0;
    top: 10px;
  }
  > svg + a,
  > div + a {
    margin-left: 1rem;
  }
`;

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); 

  // 로그인 관련 함수
  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  // 알림 관련 함수 (임시)
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  // 임의의 알림 데이터 설정
  const notifications = [
    {
      id: 1,
      user: 'nickname',
      message: '님이 내 게시물을 마음에 들어합니다.',
      date: '24/03/02',
      details: '어떤 사료가 좋을까요?',
    },
    {
      id: 2,
      user: '닉네임',
      message: '님이 내 게시물을 마음에 들어합니다.',
      date: '어제',
      details:
        '알림이 없을때를 고려하지 않음 외부 클릭시 닫히지 않음을 고려하지 않음',
    },
    {
      id: 3,
      user: 'nickname',
      message: '님이 내 게시물을 마음에 들어합니다.',
      date: '1시간',
      details:
        '갯수가 많아졌을때를 고려하지 않음 길어집니다 두줄까지 허용할까요?',
    },
    {
      id: 4,
      user: '로직을 구현하지 않음',
      message: '님이 댓글을 남겼습니다.',
      date: '24/03/02',
      details:
        '임의의 댓글입니다 임의의 댓글입니다 임의의 댓글입니다 임의의 댓글입니...',
    },
  ];

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
        <NotificationWrapper>
          <NotificationIcon>
            <LuBell onClick={toggleNotification} />
            {showNotification && (
              <Notification
                show={showNotification}
                notifications={notifications}
                onClose={closeNotification}
              />
            )}

            <Link to="/mypage">
              <LuUser2 />
            </Link>
            <Button
              buttonStyle="grey"
              buttonSize="sm"
              onClick={handleOpenLoginModal}
            >
              로그인
            </Button>
            {loginModalOpen && (
              <SmallModal
                onClose={handleCloseLoginModal}
                component={<Login />}
              />
            )}
          </NotificationIcon>
        </NotificationWrapper>
      </Content>
    </Wrapper>
  );
};
export default Header;
