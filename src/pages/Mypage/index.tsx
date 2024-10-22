import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// 컴포넌트
import ListContainer from '@/components/Mypage&Userpage/ListContainer';
import PetCardContainer from '@/components/Mypage&Userpage/PetCardContainer';
import Loading from '@/components/common/Loading';
import UserInfoContainer from '@components/Mypage&Userpage/UserInfoContainer';
import ProfileContainer from '@components/Mypage&Userpage/ProfileContainer';
import SmallModal from '@/components/common/SmallModal';
import UserAsk from '@/pages/Mypage/UserAsk';
import TopBar from '@/components/common/TopBar';

import axiosInstance from '@/utils/axiosInstance';
import { useRecoilState } from 'recoil';
import userState, { UserState } from '@/recoil/atoms/userState';
import { Menu } from '@/components/Mypage&Userpage/containerComponents';

const Container = styled.div`
  margin: 30px 0;
`;

const Item = styled.a`
  font-weight: bold;
  padding-right: 40px;
`;

const WithdrawContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Withdraw = styled.div`
  font-size: var(--font-size-ft-1);
  text-decoration: underline;
  cursor: pointer;
`;

const Mypage: React.FC = () => {
  const [userData, setUserData] = useRecoilState<UserState>(userState);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // GET /me 엔드포인트 호출
        const meResponse = await axiosInstance.get<{ message: UserState }>(
          `me`
        );

        // 응답 구조를 안전하게 확인합니다.
        const meData = meResponse.data.message; // optional chaining 사용

        if (!meData) {
          throw new Error('사용자 데이터가 없습니다.');
        }

        // console.log('me 데이터: ', meData);
        setUserData(meData);
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmWithdraw = () => {
    setIsModalOpen(false);
  };

  const contentItems = [
    {
      id: '1',
      content: '회원정보',
      component: <UserInfoContainer userData={userData} />,
    },
    {
      id: '2',
      content: '프로필',
      component: (
        <ProfileContainer userData={userData} setUserData={setUserData} />
      ),
    },
    {
      id: '3',
      content: '반려동물 프로필',
      component: (
        <PetCardContainer buddyData={userData?.buddyId} isMe={false} />
      ),
    },
    {
      id: '4',
      content: '작성 글 목록',
      component: (
        <ListContainer postIds={userData?.postId} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <Container>
      <TopBar category="회원 정보 수정" title="마이 페이지" />
      {isLoading ? (
        <Loading />
      ) : (
        contentItems.map((item) => (
          <React.Fragment key={item.id}>
            <Menu>
              <Item>{item.content}</Item>
            </Menu>
            {item.component}
          </React.Fragment>
        ))
      )}
      <WithdrawContainer>
        <Withdraw onClick={handleWithdrawClick}>회원탈퇴</Withdraw>
      </WithdrawContainer>
      {isModalOpen && (
        <SmallModal
          component={
            <UserAsk
              onConfirm={handleConfirmWithdraw}
              onCancel={handleCloseModal}
            />
          }
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default Mypage;
