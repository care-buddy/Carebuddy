import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '@assets/carebuddyLogo.png';
import { LuBell, LuUser2, LuSearch, LuX } from 'react-icons/lu';

import Login from '@/components/Login/Login';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/common/Button';
import Notification from '@/components/Notification';
import SmallModal from '@/components/common/SmallModal';

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태

  const navigate = useNavigate();

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

  // 검색 로직
  // 검색 상태 설정
  const handleSearchState = () => {
    setSearchTerm('');
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // 검색 창에서 엔터 입력 시 검색어
  const handleSearchResult = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (searchTerm !== ''){
      navigate(`global-search?searchTerm=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

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
          {!isSearching && (
            <>
              {' '}
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
            </>
          )}

          <SearchWrapper isSearching={isSearching}>
            <LuSearch onClick={() => handleSearchState()} />
            {isSearching && (
              <>
                <SearchBar
                  placeholder="검색어를 입력하세요"
                  onKeyDown={handleSearchResult}
                />
                <LuX onClick={() => handleSearchState()} />
              </>
            )}
          </SearchWrapper>
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
  gap: 5rem;
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

const SearchWrapper = styled.div<{ isSearching: boolean }>`
  width: ${(props) => (props.isSearching ? `380px` : `auto`)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 36px 0 10px 0;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }

  > * {
    margin: 0 4px;
  }
`;

const stretching = keyframes`
from {
width: 0
}
to {
width: 300px
}
`;

const SearchBar = styled.input`
  border: none;
  border-bottom: 2px solid var(--color-grey-2);

  font-size: var(--font-size-sm);
  padding: 4px 8px;
  outline: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${stretching};
  animation-fill-mode: forwards;
`;
