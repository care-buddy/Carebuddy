import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import logo from '@assets/carebuddyLogo.png';
import { LuBell, LuUser2, LuSearch, LuX } from 'react-icons/lu';

import Login from '@/components/Login/Login';
import BasicRegistration from '@/components/Registration/BasicRegistration';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/common/Button';
import Notification from '@/components/Notification';
import SmallModal from '@/components/common/SmallModal';

import axiosInstance from '@/utils/axiosInstance';

import authState from '@/recoil/atoms/authState';

import { notifications } from '@/constants/tempData'; // 로그인때문에 내용이 많아져서 다른 곳으로 옮겨두었습니다 ! - 임시
import isAuthenticatedState from '@/recoil/selectors/authSelector';
import loginModalState from '@/recoil/atoms/loginModalState';

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  // const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태
  const [auth, setAuth] = useRecoilState(authState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const navigate = useNavigate();

  // 로그인 모달 조작 함수
  const handleLoginModal = (isOpen: boolean) => {
    setLoginModalOpen(isOpen);
  };

  // 회원가입 모달 조작 함수
  const handleRegistrationModal = (isOpen: boolean) => {
    setRegistrationModalOpen(isOpen);
    setLoginModalOpen(false);
  };

  // 알림 관련 함수 (임시)
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

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

  // 검색 창에서 엔터 입력 시 검색어로 설정
  const handleSearchResult = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (searchTerm !== '') {
      navigate(`global-search?searchTerm=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

  // 로그인 클릭 시 모달 닫기
  useEffect(() => {
    if (isAuthenticated) {
      setLoginModalOpen(false);
    }
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
    };

    try {
      const email = 'goldengooooose2024@gmail.com'; // 임시 이메일
      await axiosInstance.post(
        'auth/logout',
        { email },
        { withCredentials: true }
      );

      deleteCookie('refreshToken'); // 리프레시 토큰 쿠키 이름에 맞게 변경

      setAuth({
        accessToken: null,
      });
    } catch (error) {
      console.error(error); // 임시. 나중에 변경
    }
    window.location.href = '/';
  };

  // useEffect(() => {
  //   console.log('isAuthenticated', isAuthenticated);
  //   console.log('auth.accessToken', auth.accessToken);
  // }, [isAuthenticated]);

  // 임시
  const InfoMenuItems = [
    { to: '/hosInfo', label: '병원 검색' },
    { to: '/pharInfo', label: '약국 검색' },
  ];

  const CommunityMenuItems = [
    { to: '/community', label: '커뮤니티' },
    { to: '/post/66b9a2f06928b8fede303284', label: '포스트' }, // 임시
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
                to="/community-feed/66b5ba8c19ffced581357307" // 임시
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
            {isAuthenticated ? (
              <Button
                buttonStyle="grey"
                buttonSize="sm"
                onClick={() => handleLogout()}
              >
                로그아웃
              </Button>
            ) : (
              <Button
                buttonStyle="grey"
                buttonSize="sm"
                onClick={() => handleLoginModal(true)}
              >
                로그인
              </Button>
            )}
            {loginModalOpen && (
              <SmallModal
                onClose={() => handleLoginModal(false)}
                component={
                  <Login
                    onOpenRegistrationModal={() =>
                      handleRegistrationModal(true)
                    }
                    handleLoginModal={() => handleLoginModal(false)}
                  />
                }
              />
            )}
            {registrationModalOpen && (
              <SmallModal
                onClose={() => handleRegistrationModal(false)}
                component={<BasicRegistration />}
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

const SearchWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSearching'].includes(prop),
})<{ isSearching: boolean }>`
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
width: 400px
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
